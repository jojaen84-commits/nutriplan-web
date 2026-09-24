/* Pure nutrition engine. See tests/ENGINE.md for the input contract. */
(function(root,factory){
  if(typeof module==='object' && module.exports) module.exports=factory();
  else root.NutriplanNutrition=factory();
})(globalThis,function(){
'use strict';
const BASE_PROFILE_GOALS = {
  P01:{kcal:1950,protein:150,carbs:203,fat:60},
  P02:{kcal:1400,protein:110,carbs:140,fat:45}
};

const JOINT_MIX_RECIPE_CODES = new Set([
  "REC-001","REC-004","REC-005","REC-013","REC-016","REC-023",
  "REC-025","REC-026","REC-027","REC-028","REC-030","REC-031",
  "REC-035","REC-036"
]);

const FOOD_SCALE_ROLE = {
  A001:"P", A002:"C", A003:"K", A004:"K", A005:"ALL", A006:"F",
  A007:"ALL", A008:"C", A009:"P", A010:"CF", A011:"C", A012:"P",
  A013:"PF", A014:"CF", A015:"K", A016:"PF", A017:"PF", A018:"C",
  A019:"K", A020:"ALL", A021:"C", A022:"C", A023:"P", A024:"PC",
  A025:"K", A026:"ALL", A027:"C", A028:"P", A029:"K", A030:"K", A031:"C", A032:"K", A033:"K", A034:"K", A035:"K", A036:"CF", A037:"PF", A038:"K", A039:"K", A040:"K", A041:"P", A042:"C", A043:"C", A044:"C", A053:"PF", A054:"K", A055:"K", A056:"K", A057:"C", A059:"C"
};

const FIXED_FOOD_NUTRITION_100={
  // Tortilla de avena Hacendado: 60 g = 172 kcal · 9,1 P · 24 HC · 3,6 G
  A021:{kcal:286.6666667,protein:15.1666667,carbs:40.0,fat:6.0},
  // Huevo entero: 60 g = 78 kcal · 6,3 P · 0,6 HC · 5,3 G
  A016:{kcal:130.0,protein:10.5,carbs:1.0,fat:8.8333333},
  // AOVE
  A006:{kcal:900.0,protein:0,carbs:0,fat:100.0},
  // Yogur griego ligero usado en Nutriplan
  A007:{kcal:60.0,protein:5.8,carbs:4.7,fat:2.0}
};

// Preserve operation order: nutrient * (grams / 100), without display rounding.
function addNutrition(total,n,grams){
  const q=grams/100;
  total.kcal+=n.kcal*q;total.protein+=n.protein*q;
  total.carbs+=n.carbs*q;total.fat+=n.fat*q;
  return total;
}
function sumNutrition(ingredients,foods){
  const total={kcal:0,protein:0,carbs:0,fat:0};
  for(const item of ingredients) addNutrition(total,foods[item.food_id].nutrition_100,item.grams);
  return total;
}
function createEngine(input){
  const DATA=input.data,defaultDate=input.dateKey;
  const ensureMenu=pid=>input.menusByPerson?.[pid] || input.menu || {};
  const recipeLocks=recipeId=>input.locks?.[recipeId]||[];
  const getRecipeAdjustment=(recipeId,pid)=>input.adjustments?.[recipeId]?.[pid]||{mode:'simple',targetKcal:null,pPct:null,cPct:null,fPct:null};
  const goalsForDate=pid=>input.goalsByPerson[pid];
  const recipeScalingGoalsForDate=pid=>input.scalingGoalsByPerson[pid];
  const coffeeTotalsFor=pid=>input.coffeeTotalsByPerson?.[pid]||{kcal:0,protein:0,carbs:0,fat:0};

function isJointMixRecipe(recipeOrId){
  const recipe=typeof recipeOrId==="string"?DATA.recipes?.[recipeOrId]:recipeOrId;
  return Boolean(recipe && (recipe.mix_mode==="joint" || JOINT_MIX_RECIPE_CODES.has(recipe.code)));
}

function isHardLockedFood(recipeId,foodId){
  const recipe=DATA.recipes?.[recipeId];
  return Boolean(recipe && (recipe.hard_locked_food_ids||[]).includes(foodId));
}

function isFoodLocked(recipeId,foodId){
  return isHardLockedFood(recipeId,foodId) || recipeLocks(recipeId).includes(foodId);
}

function isRecipePortionLocked(recipe,pid){
  if(!recipe)return false;
  if(recipe[`locked_portion_${pid}`])return true;
  if(recipe.id==="R009")return true; // batido postentreno: proporciones fijas
  return (recipe.tags||[]).some(t=>["RACION_FIJA","BLOQUEADA"].includes(String(t).toUpperCase()));
}

function goalRatios(pid,dateKey=defaultDate){
  const base=BASE_PROFILE_GOALS[pid], cur=recipeScalingGoalsForDate(pid,dateKey);
  return {
    kcal:cur.kcal/base.kcal,
    protein:cur.protein/base.protein,
    carbs:cur.carbs/base.carbs,
    fat:cur.fat/base.fat
  };
}

function recipeIngredientScale(foodId,pid,dateKey=defaultDate){
  const r=goalRatios(pid,dateKey);
  const role=FOOD_SCALE_ROLE[foodId]||"K";
  if(role==="P") return r.protein;
  if(role==="C") return r.carbs;
  if(role==="F") return r.fat;
  if(role==="PC") return Math.sqrt(r.protein*r.carbs);
  if(role==="PF") return Math.sqrt(r.protein*r.fat);
  if(role==="CF") return Math.sqrt(r.carbs*r.fat);
  if(role==="ALL") return Math.cbrt(r.protein*r.carbs*r.fat);
  return r.kcal;
}

function scaledRecipeSummaryBase(recipe,pid,dateKey=defaultDate){
  const base=recipe.summary[pid];
  if(isRecipePortionLocked(recipe,pid)){
    const s={kcal:base.kcal,protein:base.protein,carbs:base.carbs,fat:base.fat};
    const me=s.protein*4+s.carbs*4+s.fat*9;
    s.p_pct=me?s.protein*4/me:0;s.c_pct=me?s.carbs*4/me:0;s.f_pct=me?s.fat*9/me:0;
    s.goal_pct=s.kcal/goalsForDate(pid,dateKey).kcal;
    return s;
  }
  const r=goalRatios(pid,dateKey);
  const s={kcal:base.kcal*r.kcal,protein:base.protein*r.protein,carbs:base.carbs*r.carbs,fat:base.fat*r.fat};
  const me=s.protein*4+s.carbs*4+s.fat*9;
  s.p_pct=me?s.protein*4/me:0;s.c_pct=me?s.carbs*4/me:0;s.f_pct=me?s.fat*9/me:0;
  s.goal_pct=s.kcal/goalsForDate(pid,dateKey).kcal;
  return s;
}

function recipeAdjustedTargets(recipe,pid,dateKey=defaultDate){
  const base=scaledRecipeSummaryBase(recipe,pid,dateKey);
  if(isRecipePortionLocked(recipe,pid))return {kcal:base.kcal,protein:base.protein,carbs:base.carbs,fat:base.fat};
  const a=getRecipeAdjustment(recipe.id,pid,dateKey);
  const target=(a.targetKcal&&a.targetKcal>0)?Number(a.targetKcal):base.kcal;
  if(a.mode==="advanced" && a.pPct!=null && a.cPct!=null && a.fPct!=null){
    const sum=Number(a.pPct)+Number(a.cPct)+Number(a.fPct);
    if(Math.abs(sum-100)<0.6){
      return {kcal:target,protein:target*(Number(a.pPct)/100)/4,carbs:target*(Number(a.cPct)/100)/4,fat:target*(Number(a.fPct)/100)/9};
    }
  }
  const f=target/base.kcal;
  return {kcal:target,protein:base.protein*f,carbs:base.carbs*f,fat:base.fat*f};
}

function recipeMacroFactors(recipe,pid,dateKey=defaultDate){
  const base=scaledRecipeSummaryBase(recipe,pid,dateKey),t=recipeAdjustedTargets(recipe,pid,dateKey);
  return {protein:base.protein?t.protein/base.protein:1,carbs:base.carbs?t.carbs/base.carbs:1,fat:base.fat?t.fat/base.fat:1,kcal:base.kcal?t.kcal/base.kcal:1};
}

function fixedFoodNutrition100(foodId){
  // Fuente principal: la ficha nutricional real guardada en nutriplan-data.js.
  // El mapa antiguo queda solo como compatibilidad para versiones previas.
  return DATA.foods?.[foodId]?.nutrition_100
    || FIXED_FOOD_NUTRITION_100[foodId]
    || null;
}

function adjustedIngredientFactorIgnoringLock(recipeId,foodId,pid,dateKey=defaultDate){
  const recipe=DATA.recipes[recipeId];if(!recipe)return 1;
  const mf=recipeMacroFactors(recipe,pid,dateKey),role=FOOD_SCALE_ROLE[foodId]||"K";
  if(role==="P")return mf.protein;
  if(role==="C")return mf.carbs;
  if(role==="F")return mf.fat;
  if(role==="PC")return Math.sqrt(mf.protein*mf.carbs);
  if(role==="PF")return Math.sqrt(mf.protein*mf.fat);
  if(role==="CF")return Math.sqrt(mf.carbs*mf.fat);
  if(role==="ALL")return Math.cbrt(mf.protein*mf.carbs*mf.fat);
  return mf.kcal;
}

function adjustedIngredientFactor(recipeId,foodId,pid,dateKey=defaultDate){
  const recipe=DATA.recipes[recipeId];if(!recipe)return 1;
  if(isFoodLocked(recipeId,foodId))return 1;
  const mf=recipeMacroFactors(recipe,pid,dateKey),role=FOOD_SCALE_ROLE[foodId]||"K";
  if(role==="P")return mf.protein;if(role==="C")return mf.carbs;if(role==="F")return mf.fat;
  if(role==="PC")return Math.sqrt(mf.protein*mf.carbs);if(role==="PF")return Math.sqrt(mf.protein*mf.fat);
  if(role==="CF")return Math.sqrt(mf.carbs*mf.fat);if(role==="ALL")return Math.cbrt(mf.protein*mf.carbs*mf.fat);
  return mf.kcal;
}

function dayCoreMenuComplete(dateKey=defaultDate,pid="P01"){
  const m=ensureMenu(pid);
  return Boolean((m.desayuno||m.desayunoTrabajo) && m.comida && m.merienda && m.cena);
}

function recipeSelectedOnDay(recipeId,dateKey=defaultDate,pid="P01"){
  return Object.values(ensureMenu(pid)).some(rid=>rid===recipeId);
}

function rawRecipeSummaryForBalance(recipe,pid,dateKey=defaultDate){
  // Una mezcla conjunta ya tiene una composición común y un reparto único.
  // Se trata como bloque cerrado para que el ajuste diario actúe sobre las
  // demás comidas individuales, no sobre ingredientes dentro de la sartén.
  if(isJointMixRecipe(recipe)) return jointMixRecipeSummary(recipe,pid,dateKey);
  const t=recipeAdjustedTargets(recipe,pid,dateKey);
  return {kcal:t.kcal,protein:t.protein,carbs:t.carbs,fat:t.fat};
}

function roleFactorFromDayBalance(foodId,f){
  const role=FOOD_SCALE_ROLE[foodId]||"K";
  if(role==="P")return f.protein;
  if(role==="C")return f.carbs;
  if(role==="F")return f.fat;
  if(role==="PC")return Math.sqrt(f.protein*f.carbs);
  if(role==="PF")return Math.sqrt(f.protein*f.fat);
  if(role==="CF")return Math.sqrt(f.carbs*f.fat);
  if(role==="ALL")return Math.cbrt(f.protein*f.carbs*f.fat);
  return 1;
}

function simulateFlexibleRecipeSummary(recipe,pid,dateKey,f){
  if(recipeCanUseExactIngredientNutrition(recipe,pid)){
    const s={kcal:0,protein:0,carbs:0,fat:0};
    (recipe.portions?.[pid]||[]).forEach(item=>{
      const n=foodNutrition100(item.food_id);if(!n)return;
      const baseG=preDayBalanceIngredientGrams(item,pid,dateKey,recipe.id);
      const df=isFoodLocked(recipe.id,item.food_id)?1:roleFactorFromDayBalance(item.food_id,f);
      addNutrition(s,n,baseG*df);
    });
    return s;
  }

  // Compatibilidad con recetas antiguas que aún no tienen nutrition_100 en
  // todos sus ingredientes: se usa su resumen nutricional de referencia.
  const t=recipeAdjustedTargets(recipe,pid,dateKey);
  const p=t.protein*f.protein,c=t.carbs*f.carbs,fat=t.fat*f.fat;
  return {
    protein:p,carbs:c,fat,
    kcal:t.kcal+(p-t.protein)*4+(c-t.carbs)*4+(fat-t.fat)*9
  };
}

function simulateDayTotalsForBalance(pid,dateKey,f){
  const t={kcal:0,protein:0,carbs:0,fat:0};
  const coffee=coffeeTotalsFor(pid,dateKey);
  t.kcal+=coffee.kcal;t.protein+=coffee.protein;t.carbs+=coffee.carbs;t.fat+=coffee.fat;

  const menu=ensureMenu(pid);
  Object.values(menu).filter(Boolean).forEach(rid=>{
    const recipe=DATA.recipes[rid];if(!recipe)return;
    let s;
    if(isRecipePortionLocked(recipe,pid) || isJointMixRecipe(recipe)){
      // Estos bloques no se modifican durante el balance del día.
      s=isJointMixRecipe(recipe)?jointMixRecipeSummary(recipe,pid,dateKey):scaledRecipeSummary(recipe,pid,dateKey);
    }else{
      s=simulateFlexibleRecipeSummary(recipe,pid,dateKey,f);
    }
    t.kcal+=s.kcal;t.protein+=s.protein;t.carbs+=s.carbs;t.fat+=s.fat;
  });
  return t;
}

function solveBalanceFactor(current,key,lo,hi,target,metric,pid,dateKey){
  const test={...current};
  test[key]=lo;const low=simulateDayTotalsForBalance(pid,dateKey,test)[metric];
  test[key]=hi;const high=simulateDayTotalsForBalance(pid,dateKey,test)[metric];
  if(target<=low)return lo;
  if(target>=high)return hi;
  let a=lo,b=hi;
  for(let i=0;i<22;i++){
    const m=(a+b)/2;test[key]=m;
    const v=simulateDayTotalsForBalance(pid,dateKey,test)[metric];
    if(v<target)a=m;else b=m;
  }
  return (a+b)/2;
}

function dayBalanceFactors(pid,dateKey=defaultDate){
  const neutral={active:false,protein:1,carbs:1,fat:1,kcal:1,estimatedKcal:null};
  if(!dayCoreMenuComplete(dateKey,pid))return neutral;

  const menu=ensureMenu(pid);
  const recipes=Object.values(menu).filter(Boolean).map(rid=>DATA.recipes[rid]).filter(Boolean);
  if(!recipes.length)return neutral;
  const hasFlex=recipes.some(r=>!isRecipePortionLocked(r,pid) && !isJointMixRecipe(r));
  if(!hasFlex)return neutral;

  const g=goalsForDate(pid,dateKey);
  const rawF={protein:1,carbs:1,fat:1};
  const raw=simulateDayTotalsForBalance(pid,dateKey,rawF);
  const f={...rawF};

  // 1) Proteína: solo subir si falta. Nunca se reduce proteína por cuadrar kcal.
  if(raw.protein<g.protein){
    f.protein=solveBalanceFactor(f,"protein",1,1.35,g.protein,"protein",pid,dateKey);
  }

  // 2) Grasa: acercarla a su objetivo dentro de un margen prudente.
  f.fat=solveBalanceFactor(f,"fat",0.65,1.50,g.fat,"fat",pid,dateKey);

  // 3) Los hidratos absorben el ajuste energético restante.
  f.carbs=solveBalanceFactor(f,"carbs",0.55,2.00,g.kcal,"kcal",pid,dateKey);

  // Dos pasadas de refinado. Los alimentos mixtos hacen que mover un factor
  // cambie también otros macros; se vuelve a resolver para mantener prioridad:
  // kcal -> proteína mínima -> grasa razonable.
  for(let i=0;i<2;i++){
    let cur=simulateDayTotalsForBalance(pid,dateKey,f);
    if(cur.protein<g.protein-0.25 && f.protein<1.35){
      f.protein=solveBalanceFactor(f,"protein",f.protein,1.35,g.protein,"protein",pid,dateKey);
    }
    f.fat=solveBalanceFactor(f,"fat",0.65,1.50,g.fat,"fat",pid,dateKey);
    f.carbs=solveBalanceFactor(f,"carbs",0.55,2.00,g.kcal,"kcal",pid,dateKey);
  }

  const final=simulateDayTotalsForBalance(pid,dateKey,f);
  return {
    active:true,
    protein:f.protein,
    carbs:f.carbs,
    fat:f.fat,
    kcal:raw.kcal?g.kcal/raw.kcal:1,
    estimatedKcal:final.kcal,
    rawKcal:raw.kcal
  };
}

function dayBalanceIngredientFactor(recipeId,foodId,pid,dateKey=defaultDate){
  const recipe=DATA.recipes[recipeId];
  if(!recipe || !recipeSelectedOnDay(recipeId,dateKey) || isRecipePortionLocked(recipe,pid) || isJointMixRecipe(recipe))return 1;
  if(isFoodLocked(recipeId,foodId))return 1;
  const f=dayBalanceFactors(pid,dateKey);
  if(!f.active)return 1;
  const role=FOOD_SCALE_ROLE[foodId]||"K";
  if(role==="P")return f.protein;
  if(role==="C")return f.carbs;
  if(role==="F")return f.fat;
  if(role==="PC")return Math.sqrt(f.protein*f.carbs);
  if(role==="PF")return Math.sqrt(f.protein*f.fat);
  if(role==="CF")return Math.sqrt(f.carbs*f.fat);
  if(role==="ALL")return Math.cbrt(f.protein*f.carbs*f.fat);
  return 1; // verduras, especias y complementos no se inflan para cuadrar kcal
}

function dayBalanceIngredientFactorIgnoringLock(recipeId,foodId,pid,dateKey=defaultDate){
  const recipe=DATA.recipes[recipeId];
  if(!recipe || !recipeSelectedOnDay(recipeId,dateKey) || isRecipePortionLocked(recipe,pid) || isJointMixRecipe(recipe))return 1;
  const f=dayBalanceFactors(pid,dateKey);
  if(!f.active)return 1;
  const role=FOOD_SCALE_ROLE[foodId]||"K";
  if(role==="P")return f.protein;
  if(role==="C")return f.carbs;
  if(role==="F")return f.fat;
  if(role==="PC")return Math.sqrt(f.protein*f.carbs);
  if(role==="PF")return Math.sqrt(f.protein*f.fat);
  if(role==="CF")return Math.sqrt(f.carbs*f.fat);
  if(role==="ALL")return Math.cbrt(f.protein*f.carbs*f.fat);
  return 1;
}

function unlockedCounterfactualIngredientGrams(item,pid,dateKey=defaultDate,recipeId=null){
  const recipe=recipeId?DATA.recipes[recipeId]:null;
  if(!recipeId || !recipe)return item.grams*recipeIngredientScale(item.food_id,pid,dateKey);
  if(isRecipePortionLocked(recipe,pid))return item.grams;
  return item.grams
    *recipeIngredientScale(item.food_id,pid,dateKey)
    *adjustedIngredientFactorIgnoringLock(recipeId,item.food_id,pid,dateKey)
    *dayBalanceIngredientFactorIgnoringLock(recipeId,item.food_id,pid,dateKey);
}

function lockedIngredientMacroDelta(recipe,pid,dateKey=defaultDate){
  const d={kcal:0,protein:0,carbs:0,fat:0};
  if(!recipe || isRecipePortionLocked(recipe,pid))return d;
  (recipe.portions?.[pid]||[]).forEach(item=>{
    if(!isFoodLocked(recipe.id,item.food_id))return;
    const n=fixedFoodNutrition100(item.food_id);
    if(!n)return;
    const fixedG=Number(item.grams)||0;
    const unlockedG=unlockedCounterfactualIngredientGrams(item,pid,dateKey,recipe.id);
    const deltaG=fixedG-unlockedG;
    addNutrition(d,n,deltaG);
  });
  return d;
}

function preDayBalanceIngredientGrams(item,pid,dateKey=defaultDate,recipeId=null){
  const recipe=recipeId?DATA.recipes[recipeId]:null;
  if(recipe && isRecipePortionLocked(recipe,pid))return Number(item.grams)||0;
  if(recipeId && isFoodLocked(recipeId,item.food_id))return Number(item.grams)||0;
  const base=(Number(item.grams)||0)*recipeIngredientScale(item.food_id,pid,dateKey);
  if(!recipeId)return base;
  return base*adjustedIngredientFactor(recipeId,item.food_id,pid,dateKey);
}

function jointMixShare(recipe,pid,dateKey=defaultDate){
  if(!recipe)return pid==="P01"?0.5:0.5;
  const j=recipeAdjustedTargets(recipe,"P01",dateKey);
  const e=recipeAdjustedTargets(recipe,"P02",dateKey);
  const jk=Math.max(0,Number(j.kcal)||0), ek=Math.max(0,Number(e.kcal)||0);
  const total=jk+ek;
  const shareJ=total>0?jk/total:0.5;
  return pid==="P01"?shareJ:1-shareJ;
}

function jointMixBatchIngredientGrams(recipe,foodId,dateKey=defaultDate){
  let total=0;
  ["P01","P02"].forEach(pid=>{
    (recipe.portions?.[pid]||[]).forEach(item=>{
      if(item.food_id===foodId) total+=preDayBalanceIngredientGrams(item,pid,dateKey,recipe.id);
    });
  });
  return total;
}

function jointMixIngredientGrams(recipe,foodId,pid,dateKey=defaultDate){
  return jointMixBatchIngredientGrams(recipe,foodId,dateKey)*jointMixShare(recipe,pid,dateKey);
}

function scaledIngredientGrams(item,pid,dateKey=defaultDate,recipeId=null){
  const recipe=recipeId?DATA.recipes[recipeId]:null;
  if(recipe && isJointMixRecipe(recipe)){
    return jointMixIngredientGrams(recipe,item.food_id,pid,dateKey);
  }
  if(recipe && isRecipePortionLocked(recipe,pid))return item.grams;
  if(recipeId && isFoodLocked(recipeId,item.food_id))return item.grams;
  const base=item.grams*recipeIngredientScale(item.food_id,pid,dateKey);
  if(!recipeId)return base;
  return base
    *adjustedIngredientFactor(recipeId,item.food_id,pid,dateKey)
    *dayBalanceIngredientFactor(recipeId,item.food_id,pid,dateKey);
}

function foodNutrition100(foodId){
  return DATA.foods?.[foodId]?.nutrition_100 || null;
}

function recipeCanUseExactIngredientNutrition(recipe,pid){
  const items=recipe?.portions?.[pid]||[];
  return items.length>0 && items.every(item=>Boolean(foodNutrition100(item.food_id)));
}

function exactRecipeSummaryFromFinalIngredients(recipe,pid,dateKey=defaultDate){
  if(!recipeCanUseExactIngredientNutrition(recipe,pid))return null;
  const ingredients=(recipe.portions?.[pid]||[]).map(item=>({...item,
    grams:scaledIngredientGrams(item,pid,dateKey,recipe.id)}));
  const s=sumNutrition(ingredients,DATA.foods);

  const me=s.protein*4+s.carbs*4+s.fat*9;
  s.p_pct=me?s.protein*4/me:0;
  s.c_pct=me?s.carbs*4/me:0;
  s.f_pct=me?s.fat*9/me:0;
  s.goal_pct=s.kcal/goalsForDate(pid,dateKey).kcal;
  return s;
}

function jointMixRecipeSummary(recipe,pid,dateKey=defaultDate){
  const exact=exactRecipeSummaryFromFinalIngredients(recipe,pid,dateKey);
  if(exact)return exact;

  const j=recipeAdjustedTargets(recipe,"P01",dateKey);
  const e=recipeAdjustedTargets(recipe,"P02",dateKey);
  const share=jointMixShare(recipe,pid,dateKey);
  const s={
    kcal:(j.kcal+e.kcal)*share,
    protein:(j.protein+e.protein)*share,
    carbs:(j.carbs+e.carbs)*share,
    fat:(j.fat+e.fat)*share
  };
  const me=s.protein*4+s.carbs*4+s.fat*9;
  s.p_pct=me?s.protein*4/me:0;
  s.c_pct=me?s.carbs*4/me:0;
  s.f_pct=me?s.fat*9/me:0;
  s.goal_pct=s.kcal/goalsForDate(pid,dateKey).kcal;
  return s;
}

function scaledRecipeSummary(recipe,pid,dateKey=defaultDate){
  // En mezcla conjunta manda el porcentaje único de la preparación completa.
  // El balance diario compensa después con las demás comidas individuales.
  if(isJointMixRecipe(recipe)) return jointMixRecipeSummary(recipe,pid,dateKey);

  // Si disponemos de la nutrición individual de todos los alimentos,
  // el resumen se obtiene de LOS MISMOS GRAMOS que aparecen en pantalla.
  // Así no puede existir diferencia entre ingredientes y kcal/macros.
  const exact=exactRecipeSummaryFromFinalIngredients(recipe,pid,dateKey);
  if(exact)return exact;

  const t=recipeAdjustedTargets(recipe,pid,dateKey);
  let s={kcal:t.kcal,protein:t.protein,carbs:t.carbs,fat:t.fat};

  if(recipeSelectedOnDay(recipe.id,dateKey) && !isRecipePortionLocked(recipe,pid)){
    const f=dayBalanceFactors(pid,dateKey);
    if(f.active){
      const p=t.protein*f.protein;
      const c=t.carbs*f.carbs;
      const fat=t.fat*f.fat;
      s={
        protein:p,
        carbs:c,
        fat,
        kcal:t.kcal+(p-t.protein)*4+(c-t.carbs)*4+(fat-t.fat)*9
      };
    }
  }

  // Un ingrediente fijo puede quedar por encima o por debajo de los gramos
  // que habría producido el escalado. Ese delta debe reflejarse en kcal/macros.
  const lockDelta=lockedIngredientMacroDelta(recipe,pid,dateKey);
  s.kcal+=lockDelta.kcal;
  s.protein+=lockDelta.protein;
  s.carbs+=lockDelta.carbs;
  s.fat+=lockDelta.fat;

  const me=s.protein*4+s.carbs*4+s.fat*9;
  s.p_pct=me?s.protein*4/me:0;s.c_pct=me?s.carbs*4/me:0;s.f_pct=me?s.fat*9/me:0;
  s.goal_pct=s.kcal/goalsForDate(pid,dateKey).kcal;return s;
}

function resolveRecipe(recipeId,pid){
  const recipe=DATA.recipes[recipeId];
  const ingredients=(recipe.portions?.[pid]||[]).map(item=>({...item,
    grams:scaledIngredientGrams(item,pid,defaultDate,recipeId)}));
  const summary=scaledRecipeSummary(recipe,pid);
  const calculationMode=recipeCanUseExactIngredientNutrition(recipe,pid)?'exact':'legacy';
  const constraints=[];
  if(isRecipePortionLocked(recipe,pid))constraints.push({type:'fixed-portion',personId:pid});
  if(isJointMixRecipe(recipe))constraints.push({type:'joint-mix',share:jointMixShare(recipe,pid)});
  for(const item of ingredients){
    if(isFoodLocked(recipeId,item.food_id))constraints.push({
      type:isHardLockedFood(recipeId,item.food_id)?'hard-lock':'lock',foodId:item.food_id,
      scope:isJointMixRecipe(recipe)?'batch':'person'
    });
  }
  const warnings=calculationMode==='legacy'?[{code:'legacy-nutrition',
    missingFoodIds:[...new Set(ingredients.filter(i=>!foodNutrition100(i.food_id)).map(i=>i.food_id))]}]:[];
  return {ingredients,nutrition:{kcal:summary.kcal,protein:summary.protein,carbs:summary.carbs,fat:summary.fat},
    calculationMode,constraints,warnings,
    percentages:{p_pct:summary.p_pct,c_pct:summary.c_pct,f_pct:summary.f_pct,goal_pct:summary.goal_pct}};
}
return {resolveRecipe,isJointMixRecipe,isHardLockedFood,isFoodLocked,isRecipePortionLocked,goalRatios,recipeIngredientScale,scaledRecipeSummaryBase,recipeAdjustedTargets,recipeMacroFactors,fixedFoodNutrition100,adjustedIngredientFactorIgnoringLock,adjustedIngredientFactor,dayCoreMenuComplete,recipeSelectedOnDay,rawRecipeSummaryForBalance,roleFactorFromDayBalance,simulateFlexibleRecipeSummary,simulateDayTotalsForBalance,solveBalanceFactor,dayBalanceFactors,dayBalanceIngredientFactor,dayBalanceIngredientFactorIgnoringLock,unlockedCounterfactualIngredientGrams,lockedIngredientMacroDelta,preDayBalanceIngredientGrams,jointMixShare,jointMixBatchIngredientGrams,jointMixIngredientGrams,scaledIngredientGrams,foodNutrition100,recipeCanUseExactIngredientNutrition,exactRecipeSummaryFromFinalIngredients,jointMixRecipeSummary,scaledRecipeSummary};
}
return {createEngine,sumNutrition,resolveRecipe:input=>createEngine(input).resolveRecipe(input.recipeId,input.personId)};
});
