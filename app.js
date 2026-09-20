if(!window.NUTRIPLAN_DATA){
  document.body.innerHTML = `
    <main style="max-width:760px;margin:40px auto;padding:20px;font-family:system-ui">
      <h1>Nutriplan</h1>
      <p>No se ha podido cargar <b>nutriplan-data.js</b>.</p>
      <p>Comprueba que <b>nutriplan.html</b> y <b>nutriplan-data.js</b> están guardados en la misma carpeta.</p>
    </main>`;
  throw new Error("Falta nutriplan-data.js");
}
const DATA = window.NUTRIPLAN_DATA;

// Adapter: profile/training policy and mutable application state stay outside the engine.
function nutritionEngineInput(dateKey=state.selectedDate){
  return {data:DATA,dateKey,menu:ensureMenu(dateKey),locks:state.recipeLocks,
    adjustments:state.recipeAdjustments?.[dateKey]||{},
    goalsByPerson:{P01:goalsForDate('P01',dateKey),P02:goalsForDate('P02',dateKey)},
    scalingGoalsByPerson:{P01:recipeScalingGoalsForDate('P01',dateKey),P02:recipeScalingGoalsForDate('P02',dateKey)},
    coffeeTotalsByPerson:{P01:coffeeTotalsFor('P01',dateKey),P02:coffeeTotalsFor('P02',dateKey)}};
}
function nutritionEngineForDate(dateKey=state.selectedDate){
  return NutriplanNutrition.createEngine(nutritionEngineInput(dateKey));
}


const menuSlotDefs = [
  ["desayuno","Desayuno"],
  ["desayunoTrabajo","Desayuno trabajo"],
  ["comida","Comida"],
  ["postreFruta","Fruta después de comer"],
  ["merienda","Merienda"],
  ["cena","Cena"],
  ["suplementacion","Suplementación"]
];

// Perfiles nuevos sin medidas personales. Los valores de cálculo son opciones genéricas.
const DEFAULT_PROFILE_SETTINGS = {
  P01:{name:'Persona 1',sex:'',age:null,height:null,weight:null,activity:1.20,deficit:0,proteinKg:1.5,fatKg:0.7},
  P02:{name:'Persona 2',sex:'',age:null,height:null,weight:null,activity:1.20,deficit:0,proteinKg:1.5,fatKg:0.7}
};
// Referencias de las raciones del catálogo; no son objetivos personales.
const RECIPE_REFERENCE_GOALS=JSON.parse(JSON.stringify(DATA.profiles));
function profileName(pid){
  return state.profileSettings?.[pid]?.name || DEFAULT_PROFILE_SETTINGS[pid].name;
}

// Adaptadores de compatibilidad: las reglas y constantes viven en nutrition-engine.js.
function isJointMixRecipe(recipeOrId){
  return nutritionEngineForDate(state.selectedDate).isJointMixRecipe(recipeOrId);
}

function getRecipeAdjustment(recipeId,pid,dateKey=state.selectedDate){
  return state.recipeAdjustments?.[dateKey]?.[recipeId]?.[pid] || {mode:"simple",targetKcal:null,pPct:null,cPct:null,fPct:null};
}
function setRecipeAdjustment(recipeId,pid,adj,dateKey=state.selectedDate){
  if(!state.recipeAdjustments[dateKey]) state.recipeAdjustments[dateKey]={};
  if(!state.recipeAdjustments[dateKey][recipeId]) state.recipeAdjustments[dateKey][recipeId]={};
  state.recipeAdjustments[dateKey][recipeId][pid]=adj;
}
function clearRecipeAdjustment(recipeId,pid,dateKey=state.selectedDate){
  if(state.recipeAdjustments?.[dateKey]?.[recipeId]){
    delete state.recipeAdjustments[dateKey][recipeId][pid];
    if(!Object.keys(state.recipeAdjustments[dateKey][recipeId]).length) delete state.recipeAdjustments[dateKey][recipeId];
    if(!Object.keys(state.recipeAdjustments[dateKey]).length) delete state.recipeAdjustments[dateKey];
  }
}
function recipeLocks(recipeId){return state.recipeLocks[recipeId]||[];}
function isHardLockedFood(recipeId,foodId){
  return nutritionEngineForDate(state.selectedDate).isHardLockedFood(recipeId,foodId);
}
function isFoodLocked(recipeId,foodId){
  return nutritionEngineForDate(state.selectedDate).isFoodLocked(recipeId,foodId);
}
function isRecipePortionLocked(recipe,pid){
  return nutritionEngineForDate(state.selectedDate).isRecipePortionLocked(recipe,pid);
}
function toggleRecipeLock(recipeId,foodId,checked){
  if(isHardLockedFood(recipeId,foodId)){
    const s=new Set(recipeLocks(recipeId));
    s.add(foodId);
    state.recipeLocks[recipeId]=[...s];
    save();
    return;
  }
  const s=new Set(recipeLocks(recipeId));
  if(checked)s.add(foodId);else s.delete(foodId);
  state.recipeLocks[recipeId]=[...s];
  save();
}

function trainingData(){
  return window.NUTRIPLAN_TRAINING_DATA || {
    previousDayCarbGkg:{"3":{easy:4.0,hard:4.6}},
    scalingExtraCarbs:{"3":{easy:100,hard:125}}
  };
}
function trainingForDate(trainingDate){
  return state.trainingByDate?.[trainingDate] || null;
}
function trainingForTomorrow(dateKey=state.selectedDate){
  const trainingDate=addDays(dateKey,1);
  return {trainingDate,training:trainingForDate(trainingDate)};
}
function durationKey(hours){
  return String(Number(hours));
}
function nutritionTrainingAdjustment(pid,dateKey=state.selectedDate){
  if(pid!=="P01")return null;
  const base=profileCalc(pid,dateKey);
  const {trainingDate,training}=trainingForTomorrow(dateKey);
  if(!training || training.type!=="bike" || training.applyNutrition===false)return null;

  const table=trainingData();
  const dk=durationKey(training.duration||3);
  const intensity=training.intensity==="hard"?"hard":"easy";
  const targetGkg=Number(table.previousDayCarbGkg?.[dk]?.[intensity]);
  if(!Number.isFinite(targetGkg))return null;

  const targetCarbs=Math.max(base.carbs,base.weight*targetGkg);
  const extraCarbs=Math.max(0,targetCarbs-base.carbs);
  return {
    trainingDate,training,targetGkg,targetCarbs,extraCarbs,
    extraKcal:extraCarbs*4,
    base
  };
}
// Objetivo nutricional visible: se calcula realmente en g de HC/kg.
function goalsForDate(pid,dateKey=state.selectedDate){
  const x=profileCalc(pid,dateKey);
  const adj=nutritionTrainingAdjustment(pid,dateKey);
  if(!adj)return {kcal:x.target,protein:x.protein,carbs:x.carbs,fat:x.fat};
  return {
    kcal:x.target+adj.extraKcal,
    protein:x.protein,
    carbs:adj.targetCarbs,
    fat:x.fat
  };
}
// Escalado automático de recetas: progresivo y limitado para evitar
// que todas las raciones aumenten bruscamente al cambiar a objetivos g/kg.
function recipeScalingGoalsForDate(pid,dateKey=state.selectedDate){
  const x=profileCalc(pid,dateKey);
  if(pid!=="P01")return {kcal:x.target,protein:x.protein,carbs:x.carbs,fat:x.fat};
  const {training}=trainingForTomorrow(dateKey);
  if(!training || training.type!=="bike" || training.applyNutrition===false)
    return {kcal:x.target,protein:x.protein,carbs:x.carbs,fat:x.fat};

  const table=trainingData();
  const dk=durationKey(training.duration||3);
  const intensity=training.intensity==="hard"?"hard":"easy";
  const extra=Number(table.scalingExtraCarbs?.[dk]?.[intensity]||0);
  return {
    kcal:x.target+extra*4,
    protein:x.protein,
    carbs:x.carbs+extra,
    fat:x.fat
  };
}
function goalRatios(pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).goalRatios(pid,dateKey);
}
function recipeIngredientScale(foodId,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).recipeIngredientScale(foodId,pid,dateKey);
}
function scaledRecipeSummaryBase(recipe,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).scaledRecipeSummaryBase(recipe,pid,dateKey);
}
function recipeAdjustedTargets(recipe,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).recipeAdjustedTargets(recipe,pid,dateKey);
}
function recipeMacroFactors(recipe,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).recipeMacroFactors(recipe,pid,dateKey);
}

/*
  Nutrición por 100 g usada para corregir el resultado cuando un ingrediente
  se fija manualmente y deja de seguir el escalado automático.
  Se irá ampliando con los alimentos que tengan etiqueta verificada.
*/

function fixedFoodNutrition100(foodId){
  return nutritionEngineForDate(state.selectedDate).fixedFoodNutrition100(foodId);
}
function adjustedIngredientFactorIgnoringLock(recipeId,foodId,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).adjustedIngredientFactorIgnoringLock(recipeId,foodId,pid,dateKey);
}

function adjustedIngredientFactor(recipeId,foodId,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).adjustedIngredientFactor(recipeId,foodId,pid,dateKey);
}

const COFFEE_MILK = {
  ml:150,
  kcal:52.8,
  protein:4.95,
  carbs:7.35,
  fat:0.30
};
function coffeeCountsForDate(dateKey=state.selectedDate){
  if(!state.coffeesByDate[dateKey]) state.coffeesByDate[dateKey]={P01:0,P02:0};
  ["P01","P02"].forEach(pid=>{
    let n=Number(state.coffeesByDate[dateKey][pid]||0);
    state.coffeesByDate[dateKey][pid]=Math.max(0,Math.min(3,Math.round(n)));
  });
  return state.coffeesByDate[dateKey];
}
function coffeeTotalsFor(pid,dateKey=state.selectedDate){
  const count=coffeeCountsForDate(dateKey)[pid]||0;
  return {
    count,
    milkMl:count*COFFEE_MILK.ml,
    kcal:count*COFFEE_MILK.kcal,
    protein:count*COFFEE_MILK.protein,
    carbs:count*COFFEE_MILK.carbs,
    fat:count*COFFEE_MILK.fat
  };
}
function renderCoffeePanel(){
  const el=document.getElementById("coffeePanel");
  if(!el)return;
  const counts=coffeeCountsForDate(state.selectedDate);
  const opts=n=>[0,1,2,3].map(v=>`<option value="${v}" ${v===n?"selected":""}>${v}</option>`).join("");
  el.innerHTML=`<div class="coffee-menu-row">
    <div class="coffee-title"><b>☕ Cafés con leche</b><span>150 ml de leche desnatada por café</span></div>
    <div class="coffee-controls">
      <label>${escapeHtml(profileName("P01"))} <select data-coffee-pid="P01">${opts(counts.P01)}</select></label>
      <label>${escapeHtml(profileName("P02"))} <select data-coffee-pid="P02">${opts(counts.P02)}</select></label>
    </div>
    <div class="small coffee-info">1 café ≈ 53 kcal · 5,0 g proteína · 7,4 g HC · 0,3 g grasa</div>
  </div>`;
  el.querySelectorAll("[data-coffee-pid]").forEach(sel=>{
    sel.onchange=()=>{
      const pid=sel.dataset.coffeePid;
      coffeeCountsForDate(state.selectedDate)[pid]=Number(sel.value);
      save();
      renderPlanner();
    };
  });
}

function dayCoreMenuComplete(dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).dayCoreMenuComplete(dateKey);
}
function recipeSelectedOnDay(recipeId,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).recipeSelectedOnDay(recipeId,dateKey);
}
function clampNum(v,min,max){return Math.max(min,Math.min(max,v));}
function rawRecipeSummaryForBalance(recipe,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).rawRecipeSummaryForBalance(recipe,pid,dateKey);
}
function roleFactorFromDayBalance(foodId,f){
  return nutritionEngineForDate(state.selectedDate).roleFactorFromDayBalance(foodId,f);
}

// Simula una receta flexible con unos factores de balance SIN llamar de nuevo
// a dayBalanceFactors. Cuando hay nutrition_100 completa, el cálculo usa los
// gramos reales y por tanto el optimizador trabaja con el resultado que verá
// el usuario, no con una aproximación teórica de macros.
function simulateFlexibleRecipeSummary(recipe,pid,dateKey,f){
  return nutritionEngineForDate(dateKey).simulateFlexibleRecipeSummary(recipe,pid,dateKey,f);
}

function simulateDayTotalsForBalance(pid,dateKey,f){
  return nutritionEngineForDate(dateKey).simulateDayTotalsForBalance(pid,dateKey,f);
}

function solveBalanceFactor(current,key,lo,hi,target,metric,pid,dateKey){
  return nutritionEngineForDate(dateKey).solveBalanceFactor(current,key,lo,hi,target,metric,pid,dateKey);
}

function dayBalanceFactors(pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).dayBalanceFactors(pid,dateKey);
}
function dayBalanceIngredientFactor(recipeId,foodId,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).dayBalanceIngredientFactor(recipeId,foodId,pid,dateKey);
}

function dayBalanceIngredientFactorIgnoringLock(recipeId,foodId,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).dayBalanceIngredientFactorIgnoringLock(recipeId,foodId,pid,dateKey);
}
function unlockedCounterfactualIngredientGrams(item,pid,dateKey=state.selectedDate,recipeId=null){
  return nutritionEngineForDate(dateKey).unlockedCounterfactualIngredientGrams(item,pid,dateKey,recipeId);
}
function lockedIngredientMacroDelta(recipe,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).lockedIngredientMacroDelta(recipe,pid,dateKey);
}

// Cantidad antes del equilibrado del día. Es la base con la que construimos
// el lote común de una receta de mezcla conjunta.
function preDayBalanceIngredientGrams(item,pid,dateKey=state.selectedDate,recipeId=null){
  return nutritionEngineForDate(dateKey).preDayBalanceIngredientGrams(item,pid,dateKey,recipeId);
}

// Porcentaje único de una mezcla conjunta. Se obtiene de la energía que la
// receta habría asignado a cada persona con sus objetivos actuales. Por eso
// cambia automáticamente al modificar peso, déficit u objetivos.
function jointMixShare(recipe,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).jointMixShare(recipe,pid,dateKey);
}

function jointMixBatchIngredientGrams(recipe,foodId,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).jointMixBatchIngredientGrams(recipe,foodId,dateKey);
}

function jointMixIngredientGrams(recipe,foodId,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).jointMixIngredientGrams(recipe,foodId,pid,dateKey);
}

function scaledIngredientGrams(item,pid,dateKey=state.selectedDate,recipeId=null){
  return nutritionEngineForDate(dateKey).scaledIngredientGrams(item,pid,dateKey,recipeId);
}

function foodNutrition100(foodId){
  return nutritionEngineForDate(state.selectedDate).foodNutrition100(foodId);
}
function recipeCanUseExactIngredientNutrition(recipe,pid){
  return nutritionEngineForDate(state.selectedDate).recipeCanUseExactIngredientNutrition(recipe,pid);
}
// Motor v2: cuando todos los ingredientes tienen nutrition_100,
// kcal y macros se calculan SIEMPRE desde los gramos finales que ve el usuario.
// Los bloqueos solo controlan el escalado; no congelan el resumen nutricional.
function exactRecipeSummaryFromFinalIngredients(recipe,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).exactRecipeSummaryFromFinalIngredients(recipe,pid,dateKey);
}

// Resumen nutricional real de una mezcla conjunta. Si todos los alimentos
// tienen nutrición/100 g usamos directamente los gramos finales. En recetas
// antiguas sin ficha nutricional completa, combinamos los macros objetivo de
// ambos y aplicamos el mismo porcentaje único a toda la preparación.
function jointMixRecipeSummary(recipe,pid,dateKey=state.selectedDate){
  return nutritionEngineForDate(dateKey).jointMixRecipeSummary(recipe,pid,dateKey);
}

function scaledRecipeSummary(recipe,pid,dateKey=state.selectedDate){
  const result=nutritionEngineForDate(dateKey).resolveRecipe(recipe.id,pid);
  return {...result.nutrition,...result.percentages};
}

function dateKeyLocal(d=new Date()){
  const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0"),day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function emptyMenu(){
  return {desayuno:"",desayunoTrabajo:"",comida:"",postreFruta:"",merienda:"",cena:"",suplementacion:""};
}
function normalizeOldMenu(menu){
  const x=emptyMenu();
  if(!menu)return x;
  x.desayuno=menu.desayuno||"";
  x.desayunoTrabajo=menu.desayunoTrabajo||"";
  x.comida=menu.comida||"";
  x.postreFruta=menu.postreFruta||"";
  x.merienda=menu.merienda||"";
  x.cena=menu.cena||"";
  x.suplementacion=menu.suplementacion||menu.extra||"";
  return x;
}

// Si el JSON principal está dañado, conservarlo intacto y usar una clave de
// recuperación independiente. Nunca sobrescribir tampoco recuperaciones dañadas.
let stateStorageKey="nutriplan_state";
let recoveringState=false;
let recoverySaveFailed=false;
function readStoredState(){
  for(let attempt=0;;attempt++){
    stateStorageKey=attempt===0?"nutriplan_state":`nutriplan_state_recovered${attempt===1?"":"_"+attempt}`;
    const raw=localStorage.getItem(stateStorageKey);
    if(raw==null)return null;
    try{
      const parsed=JSON.parse(raw);
      if(parsed!==null && (typeof parsed!=="object" || Array.isArray(parsed)))throw new Error("Estado inválido");
      return parsed;
    }catch(_){
      recoveringState=true;
    }
  }
}
let state = readStoredState() || {
  menusByDate:{},
  selectedDate:dateKeyLocal(),
  checks:{},
  profileSettings:JSON.parse(JSON.stringify(DEFAULT_PROFILE_SETTINGS))
};
if(!state.profileSettings)state.profileSettings={};
for(const pid of ['P01','P02']){
  state.profileSettings[pid]={...DEFAULT_PROFILE_SETTINGS[pid],...state.profileSettings[pid]};
}
if(!state.checks)state.checks={};
// No se reinicializan registros, preferencias ni marcas de migración existentes.
state.publicPwaMigrationV1=true;
// Nuevo modelo de macros: proteína y grasa en g/kg; los HC completan las kcal.
// Si una versión anterior dejó una grasa fija desproporcionada (p. ej. 90+ g),
// se corrige automáticamente al valor razonable por defecto.
Object.keys(state.profileSettings).forEach(pid=>{
  const s=state.profileSettings[pid];
  const def=DEFAULT_PROFILE_SETTINGS[pid];
  let candidate=Number(s.fatKg);
  if(!(candidate>=0.45 && candidate<=0.90)){
    const legacyWeight=Number(s.weight)||def.weight;
    const legacyFat=Number(s.fatMin);
    const legacyRatio=legacyWeight>0?legacyFat/legacyWeight:NaN;
    candidate=(legacyRatio>=0.45 && legacyRatio<=0.90)?legacyRatio:def.fatKg;
  }
  s.fatKg=Math.round(candidate*100)/100;
});
if(!state.selectedDate) state.selectedDate=dateKeyLocal();

// Evolución corporal local por fecha. No se distribuye un histórico personal.
if(!state.evolutionRecords) state.evolutionRecords={P01:{},P02:{}};
if(!state.evolutionRecords.P01) state.evolutionRecords.P01={};
if(!state.evolutionRecords.P02) state.evolutionRecords.P02={};

// Importar pesos de formatos locales antiguos una sola vez. Después se respetan
// las eliminaciones; los datos privados iniciales ya deben estar guardados.
if(!state.evolutionMigrationV1){
["P01","P02"].forEach(pid=>{
  const defaults={}; // Los únicos registros importables son los ya guardados localmente.

  // Migración desde versiones antiguas que solo guardaban peso.
  const oldWeights={...state.weightsByDate?.[pid],...state.evolutionWeightsByDate?.[pid]};
  Object.entries(oldWeights).forEach(([date,weight])=>{
    if(!Number.isFinite(Number(weight)) || Number(weight)<=0)return;
    if(!state.evolutionRecords[pid][date]) state.evolutionRecords[pid][date]={weight:Number(weight)};
    else if(state.evolutionRecords[pid][date].weight==null) state.evolutionRecords[pid][date].weight=Number(weight);
  });
  // Prioridad: registros actuales > pesos antiguos del usuario.
  state.evolutionRecords[pid]={...defaults,...state.evolutionRecords[pid]};
});
state.evolutionMigrationV1=true;
}

// Excepciones manuales: solo afectan al día concreto y no modifican Evolución.
if(!state.manualWeightOverrides) state.manualWeightOverrides={P01:{},P02:{}};
if(!state.manualWeightOverrides.P01) state.manualWeightOverrides.P01={};
if(!state.manualWeightOverrides.P02) state.manualWeightOverrides.P02={};

if(!state.trainingByDate) state.trainingByDate={};
if(!state.routeNutritionByDate) state.routeNutritionByDate={};

// Actividad realmente realizada. Se registra aparte del objetivo nutricional:
// no se "comen de vuelta" automáticamente las kcal de ejercicio.
if(!state.exerciseByDate) state.exerciseByDate={};

// Cafés con leche: cada unidad = café + 150 ml de leche desnatada.
// Se guardan por fecha y por persona, independientes de las recetas.
if(!state.coffeesByDate) state.coffeesByDate={};

// Convertir primero el menú único para que la migración de cafés pueda leerlo.
if(!state.menusByDate){
  state.menusByDate={};
  if(state.menu){
    state.menusByDate[state.selectedDate]=normalizeOldMenu(state.menu);
    delete state.menu;
  }
}

// Migración de menús antiguos: las REC-011, REC-015 y REC-018 incluían un café.
// Conservamos aproximadamente ese registro inicial y después puede editarse de 0 a 3.
if(!state.coffeeMigrationV1){
  Object.entries(state.menusByDate||{}).forEach(([date,menu])=>{
    if(state.coffeesByDate[date])return;
    const legacyCoffeeRecipes=["R011","R015","R018"];
    const count=Math.min(3,Object.values(menu||{}).filter(rid=>legacyCoffeeRecipes.includes(rid)).length);
    if(count>0) state.coffeesByDate[date]={P01:count,P02:count};
  });
  state.coffeeMigrationV1=true;
  save();
}

// Intentar conservar datos de versiones anteriores del módulo de entrenamientos.
(function migrateLegacyTraining(){
  const normalize=(rec)=>{
    if(!rec || typeof rec!=="object")return null;
    const rawType=String(rec.type??rec.mode??rec.sport??"").toLowerCase();
    const type=(rawType.includes("bici")||rawType.includes("bike")||rawType.includes("cicl"))?"bike":
               (rawType.includes("sin")||rawType.includes("none"))?"none":
               (rec.duration||rec.hours)?"bike":"none";
    let duration=Number(rec.duration??rec.hours??rec.durationHours??3);
    if(!Number.isFinite(duration))duration=3;
    duration=Math.max(1.5,Math.min(5,Math.round(duration*2)/2));
    const rawInt=String(rec.intensity??rec.level??"easy").toLowerCase();
    const intensity=(rawInt.includes("inten")||rawInt.includes("hard"))?"hard":"easy";
    const applyNutrition=rec.applyNutrition??rec.apply??rec.nutrition??true;
    return {type,duration,intensity,applyNutrition:Boolean(applyNutrition)};
  };
  const mergeSource=(src)=>{
    if(!src)return;
    if(Array.isArray(src)){
      src.forEach(r=>{
        const date=r?.date||r?.trainingDate;
        const n=normalize(r);
        if(date&&n&&!state.trainingByDate[date])state.trainingByDate[date]=n;
      });
      return;
    }
    if(typeof src==="object"){
      const nested=src.trainingByDate||src.trainingsByDate||src.byDate;
      if(nested && nested!==src){mergeSource(nested);return;}
      Object.entries(src).forEach(([k,v])=>{
        if(/^\d{4}-\d{2}-\d{2}$/.test(k)){
          const n=normalize(v);
          if(n&&!state.trainingByDate[k])state.trainingByDate[k]=n;
        }
      });
    }
  };
  mergeSource(state.trainingsByDate);
  mergeSource(state.trainings);
  mergeSource(state.trainingSchedule);
  ["nutriplan_training_state","nutriplan_trainings","nutriplan_entrenamientos"].forEach(key=>{
    try{mergeSource(JSON.parse(localStorage.getItem(key)||"null"));}catch(_){}
  });
})();

// Ajustes por fecha/receta/persona.
if(!state.recipeAdjustments) state.recipeAdjustments={};
// Ingredientes bloqueados globalmente por receta.
if(!state.recipeLocks) state.recipeLocks={};
if(!state.recipeHardLockMigrationR014V1){
  if(!state.recipeLocks.R014) state.recipeLocks.R014=[];
  if(!state.recipeLocks.R014.includes("A021")) state.recipeLocks.R014.push("A021");
  state.recipeHardLockMigrationR014V1=true;
}
if(!state.recipeLocks.R001) state.recipeLocks.R001=["A003","A005"];

// REC-012 v1.2: el pan de espelta pasa a tener su propio alimento A059.
// Se deja fijado en 70 g = 2 rebanadas incluso en instalaciones ya existentes.
if(!state.recipeLockMigrationR012BreadV1){
  if(!state.recipeLocks.R012) state.recipeLocks.R012=[];
  state.recipeLocks.R012=state.recipeLocks.R012.filter(fid=>fid!=="A027");
  if(!state.recipeLocks.R012.includes("A059")) state.recipeLocks.R012.push("A059");
  state.recipeLockMigrationR012BreadV1=true;
}
Object.values(DATA.recipes).forEach(r=>{
  if(Array.isArray(r.locked_food_ids) && state.recipeLocks[r.id]==null){
    state.recipeLocks[r.id]=[...r.locked_food_ids];
  }
});

Object.keys(state.menusByDate).forEach(k=>state.menusByDate[k]=normalizeOldMenu(state.menusByDate[k]));

let activeType="TODAS";
let activeRecipe=null;
let activePerson="P01";

function save(){
  try{
    localStorage.setItem(stateStorageKey, JSON.stringify(state));
    recoverySaveFailed=false;
  }
  catch(error){
    // Si no hay espacio para recuperar, permitir el arranque en memoria y
    // conservar todos los valores originales. Los guardados posteriores reintentan.
    if(!recoveringState)throw error;
    recoverySaveFailed=true;
  }
}
const fmt=(n,d=0)=>Number(n||0).toLocaleString("es-ES",{maximumFractionDigits:d,minimumFractionDigits:d});
const pct=n=>fmt((n||0)*100,1)+" %";

function evolutionRecordOn(pid,dateKey){
  return state.evolutionRecords?.[pid]?.[dateKey] || null;
}
function latestEvolutionRecord(pid,dateKey){
  const records=state.evolutionRecords?.[pid]||{};
  const keys=Object.keys(records).filter(k=>k<=dateKey && Number(records[k]?.weight)>0).sort();
  if(!keys.length) return null;
  const key=keys[keys.length-1];
  return {date:key,...records[key]};
}
function latestEvolutionWeight(pid,dateKey){
  const rec=latestEvolutionRecord(pid,dateKey);
  return rec ? {date:rec.date,weight:Number(rec.weight)} : null;
}
function manualWeightOverrideOn(pid,dateKey){
  const value=state.manualWeightOverrides?.[pid]?.[dateKey];
  return value==null ? null : Number(value);
}
function effectiveWeight(pid,dateKey=state.selectedDate){
  const rec=latestEvolutionWeight(pid,dateKey);
  if(rec){
    return {weight:rec.weight,date:rec.date,source:"evolution"};
  }
  return {weight:Number(state.profileSettings[pid].weight),date:null,source:"reference"};
}
function mifflin(s,weight){
  const base=10*weight + 6.25*s.height - 5*s.age;
  return base + (s.sex==="male" ? 5 : -161);
}
function profileCalc(pid,dateKey=state.selectedDate){
  const s=state.profileSettings[pid];
  const ew=effectiveWeight(pid,dateKey);
  const weight=ew.weight;
  if(!(weight>0 && Number(s.height)>0 && Number(s.age)>0 && ['male','female'].includes(s.sex))){
    const reference=RECIPE_REFERENCE_GOALS[pid];
    return {bmr:0,tdee:0,target:reference.kcal,protein:reference.protein,fat:reference.fat,
      carbs:reference.carbs,weight:0,weightDate:null,weightSource:'unconfigured'};
  }
  const bmr=mifflin(s,weight);
  const tdee=bmr*Number(s.activity);
  const target=tdee*(1-Number(s.deficit)/100);
  const protein=weight*Number(s.proteinKg);
  const fat=weight*Number(s.fatKg);
  const carbs=Math.max(0,(target-protein*4-fat*9)/4);
  return {bmr,tdee,target,protein,fat,carbs,weight,weightDate:ew.date,weightSource:ew.source};
}
function syncProfilesFromSettings(dateKey=state.selectedDate){
  Object.keys(state.profileSettings).forEach(pid=>{
    const x=profileCalc(pid,dateKey);
    DATA.profiles[pid].name=state.profileSettings[pid].name;
    DATA.profiles[pid].kcal=Math.round(x.target);
    DATA.profiles[pid].protein=Math.round(x.protein);
    DATA.profiles[pid].carbs=Math.round(x.carbs);
    DATA.profiles[pid].fat=Math.round(x.fat);
  });
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function recipeImgKey(id){return "nutriplan_img_"+id}
function getRecipeImg(id){
  return localStorage.getItem(recipeImgKey(id))
    || (DATA.recipes[id] && DATA.recipes[id].image)
    || "";
}

function showView(id){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".navbtn").forEach(b=>b.classList.toggle("active",b.dataset.view===id));
  if(id==="shoppingView") renderShopping();
  if(id==="weekView") renderWeek();
  if(id==="evolutionView") renderEvolution();
}
document.querySelectorAll(".navbtn").forEach(b=>b.onclick=()=>showView(b.dataset.view));

function macroBoxes(s){
  return `<div class="macroline">
    <div class="macrobox"><b>${fmt(s.kcal)} </b><span>kcal</span></div>
    <div class="macrobox"><b>${fmt(s.protein,1)}</b><span>PROT.</span></div>
    <div class="macrobox"><b>${fmt(s.carbs,1)}</b><span>HC</span></div>
    <div class="macrobox"><b>${fmt(s.fat,1)}</b><span>GRASA</span></div>
  </div>`;
}
function macroBar(s){
  return `<div class="macrobar"><span style="width:${s.p_pct*100}%"></span><span style="width:${s.c_pct*100}%"></span><span style="width:${s.f_pct*100}%"></span></div>
  <div class="macrolegend"><span><i class="dot dp"></i>Proteína ${pct(s.p_pct)}</span><span><i class="dot dc"></i>HC ${pct(s.c_pct)}</span><span><i class="dot df"></i>Grasa ${pct(s.f_pct)}</span></div>`;
}

function parseDateKey(key){
  const [y,m,d]=key.split("-").map(Number);
  return new Date(y,m-1,d);
}
function addDays(key,days){
  const d=parseDateKey(key); d.setDate(d.getDate()+days); return dateKeyLocal(d);
}
function mondayKey(key){
  const d=parseDateKey(key);
  const day=(d.getDay()+6)%7;
  d.setDate(d.getDate()-day);
  return dateKeyLocal(d);
}
function weekKeys(key=state.selectedDate){
  const mon=mondayKey(key);
  return Array.from({length:7},(_,i)=>addDays(mon,i));
}
function formatLongDate(key){
  return parseDateKey(key).toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
}
function formatShortDate(key){
  return parseDateKey(key).toLocaleDateString("es-ES",{weekday:"short",day:"2-digit",month:"2-digit"});
}
function ensureMenu(key=state.selectedDate){
  if(!state.menusByDate[key]) state.menusByDate[key]=emptyMenu();

  // Normaliza el menú SIN sustituir el objeto existente.
  // Esto es importante porque los desplegables conservan una referencia
  // al objeto del día. Si lo reemplazamos al dibujar la semana, la selección
  // se escribiría sobre una referencia antigua y se perdería al refrescar.
  const menu=state.menusByDate[key];
  const normalized=normalizeOldMenu(menu);
  Object.keys(emptyMenu()).forEach(slot=>{
    menu[slot]=normalized[slot];
  });
  if(Object.prototype.hasOwnProperty.call(menu,"extra")) delete menu.extra;
  return menu;
}
function currentMenu(){ return ensureMenu(state.selectedDate); }

function daysInMonth(year,monthIndex){
  return new Date(year,monthIndex+1,0).getDate();
}
function moveSelectedMonth(delta){
  const d=parseDateKey(state.selectedDate);
  const targetMonth=d.getMonth()+delta;
  const first=new Date(d.getFullYear(),targetMonth,1);
  const day=Math.min(d.getDate(),daysInMonth(first.getFullYear(),first.getMonth()));
  selectDate(dateKeyLocal(new Date(first.getFullYear(),first.getMonth(),day)));
}
function renderMonthCalendar(){
  const grid=document.getElementById("monthCalendar");
  const title=document.getElementById("calendarMonthTitle");
  const selectedTitle=document.getElementById("selectedDateTitle");
  if(!grid||!title||!selectedTitle)return;

  const selected=parseDateKey(state.selectedDate);
  const year=selected.getFullYear(), month=selected.getMonth();
  const first=new Date(year,month,1);
  const offset=(first.getDay()+6)%7; // lunes = 0
  const count=daysInMonth(year,month);
  const today=dateKeyLocal();

  title.textContent=first.toLocaleDateString("es-ES",{month:"long",year:"numeric"});
  selectedTitle.textContent=formatLongDate(state.selectedDate);

  const cells=[];
  for(let i=0;i<offset;i++)cells.push('<button class="calendar-day empty" tabindex="-1"></button>');
  for(let day=1;day<=count;day++){
    const key=dateKeyLocal(new Date(year,month,day));
    const menu=state.menusByDate?.[key];
    const hasCoffee=Boolean(state.coffeesByDate?.[key]?.P01 || state.coffeesByDate?.[key]?.P02);
    const hasMenu=(menu && Object.values(normalizeOldMenu(menu)).some(Boolean)) || hasCoffee;
    cells.push(`<button type="button" class="calendar-day ${key===today?"today":""} ${key===state.selectedDate?"selected":""} ${hasMenu?"has-menu":""}" data-calendar-date="${key}">
      <span class="daynum">${day}</span>
    </button>`);
  }
  grid.innerHTML=cells.join("");
  grid.querySelectorAll("[data-calendar-date]").forEach(btn=>btn.onclick=()=>selectDate(btn.dataset.calendarDate));
}

function renderAllForDate(){
  syncProfilesFromSettings(state.selectedDate);
  renderPlanner();
  renderCards();
  renderConfig();
  renderEvolution();
  if(activeRecipe) renderDetail();
  if(document.getElementById("shoppingView").classList.contains("active")) renderShopping();
}


function exerciseForDate(pid,dateKey=state.selectedDate){
  return state.exerciseByDate?.[dateKey]?.[pid] || {type:"",kcal:0};
}
function exerciseCaloriesFor(pid,dateKey=state.selectedDate){
  return Math.max(0,Number(exerciseForDate(pid,dateKey).kcal)||0);
}
function ensureExercisePanelMount(){
  let el=document.getElementById("exerciseCaloriesPanel");
  if(el)return el;
  const totals=document.getElementById("dayTotals");
  if(!totals || !totals.parentNode)return null;
  el=document.createElement("div");
  el.id="exerciseCaloriesPanel";
  totals.parentNode.insertBefore(el,totals);
  return el;
}
function renderExerciseCalories(){
  const el=ensureExercisePanelMount();
  if(!el)return;

  const j=exerciseForDate("P01",state.selectedDate);
  const e=exerciseForDate("P02",state.selectedDate);

  el.innerHTML=`<div class="panel route-panel">
    <div class="route-head">
      <div>
        <h2 style="margin:0 0 3px">🔥 Actividad realizada</h2>
        <div class="small">Registra las kcal de ejercicio realmente realizadas. No modifican automáticamente el objetivo de ingesta.</div>
      </div>
      ${(exerciseCaloriesFor("P01")||exerciseCaloriesFor("P02"))?`<button class="btn soft no-print" id="clearExerciseCalories" type="button">Borrar</button>`:""}
    </div>

    <div class="route-grid">
      <div class="field">
        <label>${escapeHtml(profileName("P01"))} · actividad</label>
        <input id="exerciseTypeP01" type="text" maxlength="40" placeholder="Ej. Rodillo" value="${escapeHtml(j.type||"")}">
      </div>
      <div class="field">
        <label>${escapeHtml(profileName("P01"))} · kcal gastadas</label>
        <input id="exerciseKcalP01" type="number" min="0" max="5000" step="1" value="${exerciseCaloriesFor("P01")||""}">
      </div>
      <div class="field">
        <label>${escapeHtml(profileName("P02"))} · actividad</label>
        <input id="exerciseTypeP02" type="text" maxlength="40" placeholder="Ej. Caminar" value="${escapeHtml(e.type||"")}">
      </div>
      <div class="field">
        <label>${escapeHtml(profileName("P02"))} · kcal gastadas</label>
        <input id="exerciseKcalP02" type="number" min="0" max="5000" step="1" value="${exerciseCaloriesFor("P02")||""}">
      </div>
    </div>

    <div class="route-summary">
      <strong>${exerciseCaloriesFor("P01")||exerciseCaloriesFor("P02")
        ? `Gasto registrado: ${escapeHtml(profileName("P01"))} ${fmt(exerciseCaloriesFor("P01"))} kcal · ${escapeHtml(profileName("P02"))} ${fmt(exerciseCaloriesFor("P02"))} kcal`
        : "Sin actividad registrada"}</strong>
      <div class="route-note">Estas kcal se muestran como gasto adicional del día, pero el objetivo nutricional sigue siendo el mismo.</div>
    </div>
  </div>`;

  const commit=()=>{
    if(!state.exerciseByDate[state.selectedDate]) state.exerciseByDate[state.selectedDate]={};

    ["P01","P02"].forEach(pid=>{
      const type=document.getElementById(`exerciseType${pid}`).value.trim();
      const kcal=Math.max(0,Number(document.getElementById(`exerciseKcal${pid}`).value)||0);
      if(type || kcal){
        state.exerciseByDate[state.selectedDate][pid]={type,kcal};
      }else{
        delete state.exerciseByDate[state.selectedDate][pid];
      }
    });

    if(!Object.keys(state.exerciseByDate[state.selectedDate]).length){
      delete state.exerciseByDate[state.selectedDate];
    }
    save();
    renderExerciseCalories();
    renderTotals();
  };

  ["exerciseTypeP01","exerciseKcalP01","exerciseTypeP02","exerciseKcalP02"].forEach(id=>{
    const n=document.getElementById(id);
    if(n)n.onchange=commit;
  });

  const clear=document.getElementById("clearExerciseCalories");
  if(clear)clear.onclick=()=>{
    delete state.exerciseByDate[state.selectedDate];
    save();
    renderExerciseCalories();
    renderTotals();
  };
}

function routeNutritionForDate(dateKey=state.selectedDate){
  return state.routeNutritionByDate?.[dateKey] || {durationMin:null,gels:0,bottles:0,evoCarbPerBottle:55};
}
function routeNutritionCalc(dateKey=state.selectedDate){
  const r=routeNutritionForDate(dateKey);
  const durationMin=Number(r.durationMin)||0;
  const gels=Math.max(0,Number(r.gels)||0);
  const bottles=Math.max(0,Number(r.bottles)||0);
  const evoCarbPerBottle=Math.max(0,Number(r.evoCarbPerBottle)||55);
  const carbsPerBottle=evoCarbPerBottle*0.93;
  const gelCarbs=gels*50;
  const bottleCarbs=bottles*carbsPerBottle;
  const totalCarbs=gelCarbs+bottleCarbs;
  const durationH=durationMin>0?durationMin/60:0;
  return {durationMin,gels,bottles,evoCarbPerBottle,carbsPerBottle,gelCarbs,bottleCarbs,totalCarbs,durationH,carbsPerHour:durationH?totalCarbs/durationH:0,kcal:totalCarbs*4};
}
function routeNutritionTotalsForDate(dateKey=state.selectedDate){
  const c=routeNutritionCalc(dateKey);
  return {kcal:c.kcal,protein:0,carbs:c.totalCarbs,fat:0};
}
function formatDurationMinutes(totalMin){
  const m=Math.max(0,Math.round(Number(totalMin)||0));
  if(!m)return "—";
  const h=Math.floor(m/60), rem=m%60;
  return rem?`${h} h ${rem} min`:`${h} h`;
}
function renderRouteNutrition(){
  const el=document.getElementById("routeNutrition");
  if(!el)return;
  const c=routeNutritionCalc(state.selectedDate);
  const hours=c.durationMin?Math.floor(c.durationMin/60):"";
  const minutes=c.durationMin?c.durationMin%60:"";

  el.innerHTML=`<div class="panel route-panel">
    <div class="route-head">
      <div><h2 style="margin:0 0 3px">🚴 Nutrición en ruta</h2><div class="small">Registra a posteriori lo que realmente tomaste durante la salida.</div></div>
      ${(c.durationMin||c.gels||c.bottles)?`<button class="btn soft no-print" id="clearRouteNutrition" type="button">Borrar</button>`:""}
    </div>
    <div class="route-grid">
      <div class="field"><label>Horas reales</label><input id="routeHours" type="number" min="0" max="24" step="1" value="${hours}"></div>
      <div class="field"><label>Minutos</label><input id="routeMinutes" type="number" min="0" max="59" step="1" value="${minutes}"></div>
      <div class="field"><label>Geles (50 g HC)</label><input id="routeGels" type="number" min="0" step="1" value="${c.gels}"></div>
      <div class="field"><label>Bidones 750 ml</label><input id="routeBottles" type="number" min="0" step="0.5" value="${c.bottles}"></div>
      <div class="field"><label>EvoCarb por bidón (g)</label><input id="routeEvoCarb" type="number" min="0" step="1" value="${c.evoCarbPerBottle}"></div>
    </div>
    <div class="route-summary">
      <strong>${c.totalCarbs?`${fmt(c.totalCarbs,1)} g HC en ruta`:"Sin consumo registrado"}</strong>
      <div class="route-kpis">
        <div class="route-kpi"><b>${formatDurationMinutes(c.durationMin)}</b><small>Tiempo real</small></div>
        <div class="route-kpi"><b>${fmt(c.totalCarbs,1)} g</b><small>HC totales</small></div>
        <div class="route-kpi"><b>${c.durationH?fmt(c.carbsPerHour,1):"—"} g/h</b><small>HC por hora</small></div>
      </div>
      <div class="route-note">Cada gel = 50 g HC. Con ${fmt(c.evoCarbPerBottle)} g de EvoCarb, cada bidón aporta ≈ ${fmt(c.carbsPerBottle,1)} g HC según la etiqueta (93 % HC). Estas kcal se suman al total real de ${escapeHtml(profileName("P01"))} del día, pero se muestran aparte del menú.</div>
    </div>
  </div>`;

  const commit=()=>{
    const h=Math.max(0,Number(document.getElementById("routeHours").value)||0);
    const min=Math.max(0,Math.min(59,Number(document.getElementById("routeMinutes").value)||0));
    state.routeNutritionByDate[state.selectedDate]={
      durationMin:(h||min)?h*60+min:null,
      gels:Math.max(0,Number(document.getElementById("routeGels").value)||0),
      bottles:Math.max(0,Number(document.getElementById("routeBottles").value)||0),
      evoCarbPerBottle:Math.max(0,Number(document.getElementById("routeEvoCarb").value)||55)
    };
    save();renderRouteNutrition();renderTotals();
  };
  ["routeHours","routeMinutes","routeGels","routeBottles","routeEvoCarb"].forEach(id=>{const n=document.getElementById(id);if(n)n.onchange=commit;});
  const clear=document.getElementById("clearRouteNutrition");
  if(clear)clear.onclick=()=>{delete state.routeNutritionByDate[state.selectedDate];save();renderRouteNutrition();renderTotals();};
}

function renderTrainingTomorrow(){
  const el=document.getElementById("trainingTomorrow");
  if(!el)return;

  const trainingDate=addDays(state.selectedDate,1);
  const current=state.trainingByDate[trainingDate] || {type:"none",duration:3,intensity:"easy",applyNutrition:true};
  const dateLabel=parseDateKey(trainingDate).toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long"});
  const adj=(current.type==="bike" && current.applyNutrition!==false)
    ? (()=>{
        const base=profileCalc("P01",state.selectedDate);
        const table=trainingData();
        const dk=durationKey(current.duration||3);
        const intensity=current.intensity==="hard"?"hard":"easy";
        const gkg=Number(table.previousDayCarbGkg?.[dk]?.[intensity]);
        if(!Number.isFinite(gkg))return null;
        const target=Math.max(base.carbs,base.weight*gkg);
        return {gkg,target,extra:Math.max(0,target-base.carbs),base};
      })()
    : null;

  const durations=(trainingData().durations||[1.5,2,2.5,3,3.5,4,4.5,5])
    .map(h=>`<option value="${h}" ${Number(current.duration)===Number(h)?"selected":""}>${String(h).replace(".5"," h 30 min").replace(/^\d+$/,(x)=>x+" h")}</option>`).join("");

  el.innerHTML=`<div class="panel training-panel">
    <div class="training-head">
      <div>
        <h2>🚴 Entrenamiento de mañana</h2>
        <div class="small">${dateLabel} · afecta a la nutrición de ${escapeHtml(profileName("P01"))} de hoy</div>
      </div>
      ${current.type==="bike"?`<button class="btn soft no-print" id="clearTraining" type="button">Borrar</button>`:""}
    </div>

    <div class="training-mode no-print">
      <button type="button" data-training-type="none" class="${current.type!=="bike"?"active":""}">Sin entrenamiento</button>
      <button type="button" data-training-type="bike" class="${current.type==="bike"?"active":""}">Bicicleta</button>
    </div>

    ${current.type==="bike"?`
      <div class="training-grid">
        <div class="field">
          <label>Duración</label>
          <select id="trainingDuration">${durations}</select>
        </div>
        <div class="field">
          <label>Intensidad</label>
          <select id="trainingIntensity">
            <option value="easy" ${current.intensity!=="hard"?"selected":""}>Suave / Z2</option>
            <option value="hard" ${current.intensity==="hard"?"selected":""}>Intenso</option>
          </select>
        </div>
      </div>
      <label class="training-apply">
        <input id="trainingApply" type="checkbox" ${current.applyNutrition!==false?"checked":""}>
        <span><b>Aplicar preparación nutricional el día anterior.</b> Si se desactiva, el entrenamiento queda registrado pero no modifica los objetivos.</span>
      </label>
      <div class="training-result">
        ${adj
          ? `<strong>Objetivo de hoy: ${fmt(adj.gkg,1)} g HC/kg ≈ ${fmt(adj.target)} g HC</strong><br>
             Ajuste sobre el día normal: +${fmt(adj.extra)} g HC (+${fmt(adj.extra*4)} kcal). Proteína y grasa sin cambios.<br>
             Las raciones se escalan de forma progresiva; usa el dato HC/kg del total diario para afinar el menú.`
          : `Preparación nutricional desactivada.`
        }
      </div>`:""
    }
  </div>`;

  el.querySelectorAll("[data-training-type]").forEach(btn=>btn.onclick=()=>{
    const type=btn.dataset.trainingType;
    if(type==="none"){
      state.trainingByDate[trainingDate]={type:"none",duration:current.duration||3,intensity:current.intensity||"easy",applyNutrition:false};
    }else{
      state.trainingByDate[trainingDate]={type:"bike",duration:current.duration||3,intensity:current.intensity||"easy",applyNutrition:current.applyNutrition!==false};
    }
    save();renderPlanner();renderCards();if(activeRecipe)renderDetail();
  });

  const duration=document.getElementById("trainingDuration");
  const intensity=document.getElementById("trainingIntensity");
  const apply=document.getElementById("trainingApply");
  const commit=()=>{
    if(!state.trainingByDate[trainingDate])state.trainingByDate[trainingDate]={type:"bike"};
    state.trainingByDate[trainingDate].type="bike";
    state.trainingByDate[trainingDate].duration=Number(duration.value);
    state.trainingByDate[trainingDate].intensity=intensity.value;
    state.trainingByDate[trainingDate].applyNutrition=apply.checked;
    save();renderPlanner();renderCards();if(activeRecipe)renderDetail();
  };
  if(duration)duration.onchange=commit;
  if(intensity)intensity.onchange=commit;
  if(apply)apply.onchange=commit;

  const clear=document.getElementById("clearTraining");
  if(clear)clear.onclick=()=>{
    delete state.trainingByDate[trainingDate];
    save();renderPlanner();renderCards();if(activeRecipe)renderDetail();
  };
}

function renderPlanner(){
  syncProfilesFromSettings(state.selectedDate);
  const el=document.getElementById("menuSlots");
  renderMonthCalendar();
  renderTrainingTomorrow();
  renderExerciseCalories();
  renderRouteNutrition();

  const slotType = {
    desayuno:"DESAYUNO",
    desayunoTrabajo:"DESAYUNO",
    comida:"COMIDA",
    postreFruta:"FRUTA",
    merienda:"MERIENDA",
    cena:"CENA",
    suplementacion:"SUPLEMENTACION"
  };
  const menu=currentMenu();

  el.innerHTML=menuSlotDefs.map(([key,label])=>{
    const wantedType=slotType[key];
    const filtered=Object.values(DATA.recipes).filter(r=>r.type===wantedType || (Array.isArray(r.types)&&r.types.includes(wantedType)));
    const options=filtered.map(r=>`<option value="${r.id}">${escapeHtml(r.name)} · ${escapeHtml(r.code||r.id)}</option>`).join("");
    const rid=menu[key]||"";
    const info=rid&&DATA.recipes[rid] ? (()=>{
      const sj=scaledRecipeSummary(DATA.recipes[rid],"P01");
      const se=scaledRecipeSummary(DATA.recipes[rid],"P02");
      return `<div class="small" style="margin-top:5px">
        ${escapeHtml(profileName("P01"))} ${fmt(sj.kcal)} kcal · ${escapeHtml(profileName("P02"))} ${fmt(se.kcal)} kcal · <b>${escapeHtml(DATA.recipes[rid].code||rid)}</b>
        · <button type="button" class="btn soft" style="padding:4px 7px;font-size:11px" onclick="openRecipe('${rid}')">Ver cantidades</button>
      </div>`;
    })() : "";
    return `<div class="menu-row"><label>${label}</label>
      <div>
        <select data-slot="${key}">
          <option value="">— Sin receta —</option>
          ${options}
        </select>
        ${info}
      </div>
    </div>`;
  }).join("");

  el.querySelectorAll("select[data-slot]").forEach(s=>{
    const saved=menu[s.dataset.slot]||"";
    const valid=[...s.options].some(o=>o.value===saved);
    s.value=valid?saved:"";
    if(!valid && saved){
      menu[s.dataset.slot]="";
      save();
    }
    s.onchange=()=>{
      const dayMenu=ensureMenu(state.selectedDate);
      dayMenu[s.dataset.slot]=s.value;
      save();
      renderPlanner();
    };
  });
  renderCoffeePanel();
  renderTotals();
}

function totalsFor(pid,dateKey=state.selectedDate){
  const t={kcal:0,protein:0,carbs:0,fat:0};
  const menu=ensureMenu(dateKey);
  Object.values(menu).filter(Boolean).forEach(rid=>{
    const recipe=DATA.recipes[rid]; if(!recipe)return;
    const s=scaledRecipeSummary(recipe,pid,dateKey);
    t.kcal+=s.kcal;t.protein+=s.protein;t.carbs+=s.carbs;t.fat+=s.fat;
  });
  const coffee=coffeeTotalsFor(pid,dateKey);
  t.kcal+=coffee.kcal;
  t.protein+=coffee.protein;
  t.carbs+=coffee.carbs;
  t.fat+=coffee.fat;
  return t;
}
function progress(value,target){const w=Math.min(100,(value/target)*100); return `<div class="progress"><i style="width:${w}%"></i></div>`}
function renderTotals(){
  const el=document.getElementById("dayTotals");
  const tadj=nutritionTrainingAdjustment("P01",state.selectedDate);
  const route=routeNutritionCalc(state.selectedDate);
  const dayBalanced=dayCoreMenuComplete(state.selectedDate);
  const trainingNote=tadj?`<div class="training-day-note">
    🚴 <b>Preparación para mañana:</b> ${fmt(tadj.training.duration,1).replace(",0","")} h · ${tadj.training.intensity==="hard"?"Intenso":"Suave / Z2"}<br>
    Objetivo de ${escapeHtml(profileName("P01"))}: <b>${fmt(tadj.targetGkg,1)} g HC/kg ≈ ${fmt(tadj.targetCarbs)} g HC</b>.
  </div>`:"";
  const routeNote=route.totalCarbs?`<div class="training-day-note" style="background:#eef4fb;color:#385475">🚴 <b>Nutrición en ruta:</b> ${formatDurationMinutes(route.durationMin)} · ${fmt(route.totalCarbs,1)} g HC · ${route.durationH?fmt(route.carbsPerHour,1):"—"} g/h · ≈ ${fmt(route.kcal)} kcal.</div>`:"";
  const balanceNote=dayBalanced?`<div class="training-day-note" style="background:#f3f7f3">
    ⚖️ <b>Ajuste automático del menú activo.</b> Nutriplan mantiene la proteína si ya está cubierta y ajusta principalmente hidratos y grasa para acercarse al objetivo energético. Las recetas de mezcla conjunta conservan un único reparto ${escapeHtml(profileName("P01"))}/${escapeHtml(profileName("P02"))} y el descuadre se compensa con las demás comidas. Las recetas de ración fija no se modifican.
  </div>`:"";
  el.innerHTML=trainingNote+balanceNote+routeNote+Object.keys(DATA.profiles).map(pid=>{
    const p=DATA.profiles[pid];
    const g=goalsForDate(pid,state.selectedDate);
    const ew=effectiveWeight(pid,state.selectedDate);
    const baseT=totalsFor(pid,state.selectedDate);
    const rt=pid==="P01"?routeNutritionTotalsForDate(state.selectedDate):{kcal:0,protein:0,carbs:0,fat:0};
    const t={kcal:baseT.kcal+rt.kcal,protein:baseT.protein,carbs:baseT.carbs+rt.carbs,fat:baseT.fat};
    const exercise=exerciseForDate(pid,state.selectedDate);
    const exerciseKcal=exerciseCaloriesFor(pid,state.selectedDate);
    const netAfterExercise=t.kcal-exerciseKcal;
    return `<div class="person-block">
      <div class="person-title"><span>${escapeHtml(p.name)} · ${fmt(ew.weight,1)} kg</span><span>${fmt(t.kcal)} / ${fmt(g.kcal)} kcal</span></div>
      ${exerciseKcal?`<div class="small" style="margin:4px 0 6px;color:#8a5a18">🔥 ${escapeHtml(exercise.type||"Ejercicio")}: ${fmt(exerciseKcal)} kcal gastadas · ingesta menos ejercicio: <b>${fmt(netAfterExercise)} kcal</b></div>`:""}
      ${progress(t.kcal,g.kcal)}
      <div class="profile-kpis">
        <div class="kpi"><strong>${fmt(t.protein,1)} g</strong><small>Proteína / ${fmt(g.protein)} g</small>${progress(t.protein,g.protein)}</div>
        <div class="kpi"><strong>${fmt(t.carbs,1)} g</strong><small>HC / ${fmt(g.carbs)} g</small><span class="hckg">${(ew.weight>0?fmt(t.carbs/ew.weight,2):"—")} g/kg · obj. ${(ew.weight>0?fmt(g.carbs/ew.weight,2):"—")}</span>${progress(t.carbs,g.carbs)}</div>
        <div class="kpi"><strong>${fmt(t.fat,1)} g</strong><small>Grasa / ${fmt(g.fat)} g</small>${progress(t.fat,g.fat)}</div>
        <div class="kpi"><strong>${fmt((t.kcal/g.kcal)*100,0)} %</strong><small>Objetivo kcal</small></div>
      </div>
    </div>`;
  }).join("");
}


let dailyReportMode="summary";

function dailyReportRecipeIngredients(recipe,pid,dateKey=state.selectedDate){
  const items=(recipe.portions && recipe.portions[pid]) || [];
  return items.map(item=>{
    const grams=scaledIngredientGrams(item,pid,dateKey,recipe.id);
    return {
      food:item.food||DATA.foods?.[item.food_id]?.name||item.food_id||"Alimento",
      grams,
      note:item.note||"",
      state:item.state||""
    };
  });
}

function dailyReportMealRows(pid,dateKey=state.selectedDate){
  const menu=ensureMenu(dateKey);
  const rows=[];
  menuSlotDefs.forEach(([slot,label])=>{
    const rid=menu[slot];
    if(!rid || !DATA.recipes[rid])return;
    const recipe=DATA.recipes[rid];
    const s=scaledRecipeSummary(recipe,pid,dateKey);
    rows.push({
      kind:"recipe",
      rid,
      label,
      name:recipe.name,
      code:recipe.code||rid,
      kcal:s.kcal,
      protein:s.protein,
      carbs:s.carbs,
      fat:s.fat,
      foods:dailyReportRecipeIngredients(recipe,pid,dateKey)
    });
  });

  const coffee=coffeeTotalsFor(pid,dateKey);
  if(coffee.count){
    rows.push({
      kind:"coffee",
      label:"Cafés",
      name:`${coffee.count} café${coffee.count===1?"":"s"} con leche`,
      code:`${coffee.milkMl} ml leche desnatada`,
      kcal:coffee.kcal,
      protein:coffee.protein,
      carbs:coffee.carbs,
      fat:coffee.fat,
      foods:[
        {food:"Leche desnatada",grams:coffee.milkMl,note:`150 ml × ${coffee.count}` ,unit:"ml"},
        {food:"Café",grams:coffee.count,note:"calorías despreciables",unit:"ud"}
      ]
    });
  }

  if(pid==="P01"){
    const route=routeNutritionCalc(dateKey);
    if(route.totalCarbs){
      const routeFoods=[];
      if(route.bottles){
        routeFoods.push({
          food:"Evocarb",
          grams:route.bottles*55,
          note:`55 g por bidón de 750 ml × ${route.bottles}`,
          unit:"g"
        });
      }
      if(route.gels){
        routeFoods.push({
          food:"Gel",
          grams:route.gels,
          note:`50 g HC por gel`,
          unit:"ud"
        });
      }
      rows.push({
        kind:"route",
        label:"Nutrición en ruta",
        name:`${route.bottles} bidón${route.bottles===1?"":"es"} + ${route.gels} gel${route.gels===1?"":"es"}`,
        code:`${formatDurationMinutes(route.durationMin)} · ${route.durationH?fmt(route.carbsPerHour,1)+" g HC/h":"sin duración"}`,
        kcal:route.kcal,
        protein:0,
        carbs:route.totalCarbs,
        fat:0,
        foods:routeFoods
      });
    }
  }
  return rows;
}

function dailyReportTotals(pid,dateKey=state.selectedDate){
  const base=totalsFor(pid,dateKey);
  const route=pid==="P01"
    ? routeNutritionTotalsForDate(dateKey)
    : {kcal:0,protein:0,carbs:0,fat:0};
  return {
    kcal:base.kcal+route.kcal,
    protein:base.protein+route.protein,
    carbs:base.carbs+route.carbs,
    fat:base.fat+route.fat
  };
}

function reportPercentages(t){
  const energy=t.protein*4+t.carbs*4+t.fat*9;
  return {
    protein:energy?t.protein*4/energy*100:0,
    carbs:energy?t.carbs*4/energy*100:0,
    fat:energy?t.fat*9/energy*100:0
  };
}

function reportFoodQuantity(food){
  const unit=food.unit||"g";
  if(unit==="ml") return `${fmt(food.grams,0)} ml`;
  if(unit==="ud") return `${fmt(food.grams,0)} ud.`;
  return `${fmt(food.grams,1)} g`;
}

function dailyReportAggregatedFoods(rows){
  const map=new Map();
  rows.forEach(row=>{
    (row.foods||[]).forEach(food=>{
      const unit=food.unit||"g";
      const key=`${food.food}|||${unit}`;
      if(!map.has(key))map.set(key,{food:food.food,grams:0,unit});
      map.get(key).grams+=Number(food.grams)||0;
    });
  });
  return [...map.values()].sort((a,b)=>a.food.localeCompare(b.food,"es"));
}

function renderReportFoods(foods){
  if(!foods || !foods.length)return "";
  return `<div class="report-foods">
    <div class="report-foods-title">Alimentos y cantidades</div>
    ${foods.map(food=>`<div class="report-food-line">
      <div>
        <strong>${escapeHtml(food.food)}</strong>
        ${food.note?`<span class="report-food-note">${escapeHtml(food.note)}</span>`:""}
      </div>
      <div class="report-food-qty">${reportFoodQuantity(food)}</div>
    </div>`).join("")}
  </div>`;
}

function renderDailyReport(dateKey=state.selectedDate,mode=dailyReportMode){
  dailyReportMode=mode;
  const content=document.getElementById("dailyReportContent");
  if(!content)return;

  document.querySelectorAll(".report-mode-btn").forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.reportMode===dailyReportMode);
  });

  const date=parseDateKey(dateKey);
  const dateLabel=date.toLocaleDateString("es-ES",{
    weekday:"long",day:"numeric",month:"long",year:"numeric"
  });
  const hasAnything=Object.values(ensureMenu(dateKey)).some(Boolean)
    || coffeeCountsForDate(dateKey).P01
    || coffeeCountsForDate(dateKey).P02
    || routeNutritionCalc(dateKey).totalCarbs
    || exerciseCaloriesFor("P01",dateKey)
    || exerciseCaloriesFor("P02",dateKey);

  const detailed=dailyReportMode==="detailed";
  let html=`<header class="daily-report-header">
    <h1 id="dailyReportTitle">Informe nutricional del día ${detailed?'<span class="report-detail-label">DETALLADO</span>':""}</h1>
    <div class="daily-report-date">${escapeHtml(dateLabel)}</div>
  </header>`;

  if(!hasAnything){
    html+=`<div class="report-empty">No hay ingestas registradas para este día.</div>`;
    content.innerHTML=html;
    return;
  }

  Object.keys(DATA.profiles).forEach(pid=>{
    const p=DATA.profiles[pid];
    const rows=dailyReportMealRows(pid,dateKey);
    const t=dailyReportTotals(pid,dateKey);
    const g=goalsForDate(pid,dateKey);
    const ew=effectiveWeight(pid,dateKey);
    const perc=reportPercentages(t);

    html+=`<section class="report-person">
      <div class="report-person-title">
        <h2>${escapeHtml(p.name)}</h2>
        <span>${fmt(ew.weight,1)} kg</span>
      </div>`;

    if(rows.length){
      html+=`<div class="report-meals">
        <div class="report-meal report-meal-head">
          <div>Ingesta</div>
          <div class="report-num">kcal</div>
          <div class="report-num">Prot.</div>
          <div class="report-num">HC</div>
          <div class="report-num">Grasa</div>
        </div>
        ${rows.map(r=>`<div class="report-meal">
          <div class="report-meal-name">
            <b>${escapeHtml(r.label)} · ${escapeHtml(r.name)}</b>
            <small>${escapeHtml(r.code||"")}</small>
          </div>
          <div class="report-num">${fmt(r.kcal)}</div>
          <div class="report-num">${fmt(r.protein,1)} g</div>
          <div class="report-num">${fmt(r.carbs,1)} g</div>
          <div class="report-num">${fmt(r.fat,1)} g</div>
          ${detailed?renderReportFoods(r.foods):""}
        </div>`).join("")}
        <div class="report-meal report-total-row">
          <div class="report-meal-name"><b>TOTAL DEL DÍA</b></div>
          <div class="report-num">${fmt(t.kcal)}</div>
          <div class="report-num">${fmt(t.protein,1)} g</div>
          <div class="report-num">${fmt(t.carbs,1)} g</div>
          <div class="report-num">${fmt(t.fat,1)} g</div>
        </div>
      </div>`;
    }

    const exercise=exerciseForDate(pid,dateKey);
    const exerciseKcal=exerciseCaloriesFor(pid,dateKey);
    const netAfterExercise=t.kcal-exerciseKcal;

    html+=`<div class="report-summary">
      <div class="report-summary-card">
        <strong>${fmt(t.kcal)} kcal</strong>
        <span>Objetivo ${fmt(g.kcal)} · ${fmt(t.kcal/g.kcal*100,0)} %</span>
      </div>
      ${exerciseKcal?`<div class="report-summary-card">
        <strong>−${fmt(exerciseKcal)} kcal</strong>
        <span>${escapeHtml(exercise.type||"Ejercicio")} · neto ${fmt(netAfterExercise)} kcal</span>
      </div>`:""}
      <div class="report-summary-card">
        <strong>${fmt(t.protein,1)} g</strong>
        <span>Proteína · ${(ew.weight>0?fmt(t.protein/ew.weight,2):"—")} g/kg</span>
      </div>
      <div class="report-summary-card">
        <strong>${fmt(t.carbs,1)} g</strong>
        <span>HC · ${(ew.weight>0?fmt(t.carbs/ew.weight,2):"—")} g/kg</span>
      </div>
      <div class="report-summary-card">
        <strong>${fmt(t.fat,1)} g</strong>
        <span>Grasa · ${(ew.weight>0?fmt(t.fat/ew.weight,2):"—")} g/kg</span>
      </div>
    </div>
    <div class="report-macro-split">
      Distribución energética aproximada:
      <b>${fmt(perc.protein,0)} % proteína</b> ·
      <b>${fmt(perc.carbs,0)} % HC</b> ·
      <b>${fmt(perc.fat,0)} % grasa</b>.
      Objetivos: ${fmt(g.protein)} g proteína · ${fmt(g.carbs)} g HC · ${fmt(g.fat)} g grasa.
    </div>`;

    if(detailed){
      const allFoods=dailyReportAggregatedFoods(rows);
      html+=`<div class="report-food-summary">
        <h3>Resumen de alimentos del día</h3>
        ${allFoods.map(food=>`<div class="report-food-summary-row">
          <span>${escapeHtml(food.food)}</span>
          <span>${reportFoodQuantity(food)}</span>
        </div>`).join("")}
      </div>`;
    }

    html+=`</section>`;
  });

  html+=`<div class="report-note">
    Informe generado a partir de las ingestas registradas en Nutriplan para este día.
    Las cifras son estimaciones nutricionales basadas en las raciones y etiquetas guardadas en la aplicación.
  </div>`;

  content.innerHTML=html;
}

function dailyReportPlainText(dateKey=state.selectedDate,mode=dailyReportMode){
  const detailed=mode==="detailed";
  const date=parseDateKey(dateKey);
  const dateLabel=date.toLocaleDateString("es-ES",{
    weekday:"long",day:"numeric",month:"long",year:"numeric"
  });
  const lines=[`${detailed?"INFORME NUTRICIONAL DETALLADO":"INFORME NUTRICIONAL"} — ${dateLabel}`,""];

  Object.keys(DATA.profiles).forEach(pid=>{
    const p=DATA.profiles[pid];
    const rows=dailyReportMealRows(pid,dateKey);
    const t=dailyReportTotals(pid,dateKey);
    const g=goalsForDate(pid,dateKey);
    const ew=effectiveWeight(pid,dateKey);
    const perc=reportPercentages(t);

    lines.push(`${p.name} · ${fmt(ew.weight,1)} kg`);
    rows.forEach(r=>{
      lines.push(
        `- ${r.label}: ${r.name} [${r.code||""}] — `+
        `${fmt(r.kcal)} kcal · P ${fmt(r.protein,1)} g · HC ${fmt(r.carbs,1)} g · G ${fmt(r.fat,1)} g`
      );
      if(detailed){
        (r.foods||[]).forEach(food=>{
          lines.push(`    · ${food.food}: ${reportFoodQuantity(food)}${food.note?` (${food.note})`:""}`);
        });
      }
    });
    lines.push(
      `TOTAL: ${fmt(t.kcal)} / ${fmt(g.kcal)} kcal · `+
      `P ${fmt(t.protein,1)} / ${fmt(g.protein)} g · `+
      `HC ${fmt(t.carbs,1)} / ${fmt(g.carbs)} g (${(ew.weight>0?fmt(t.carbs/ew.weight,2):"—")} g/kg) · `+
      `G ${fmt(t.fat,1)} / ${fmt(g.fat)} g`
    );
    const exercise=exerciseForDate(pid,dateKey);
    const exerciseKcal=exerciseCaloriesFor(pid,dateKey);
    if(exerciseKcal){
      lines.push(`ACTIVIDAD: ${exercise.type||"Ejercicio"} · ${fmt(exerciseKcal)} kcal gastadas · ingesta menos ejercicio ${fmt(t.kcal-exerciseKcal)} kcal`);
    }
    lines.push(
      `Distribución: P ${fmt(perc.protein,0)} % · HC ${fmt(perc.carbs,0)} % · G ${fmt(perc.fat,0)} %`
    );

    if(detailed){
      lines.push("  Resumen de alimentos:");
      dailyReportAggregatedFoods(rows).forEach(food=>{
        lines.push(`    · ${food.food}: ${reportFoodQuantity(food)}`);
      });
    }
    lines.push("");
  });
  return lines.join("\n");
}

function openDailyReport(mode="summary"){
  dailyReportMode=mode;
  renderDailyReport(state.selectedDate,mode);
  const modal=document.getElementById("dailyReportModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("report-open");
}
function closeDailyReport(){
  const modal=document.getElementById("dailyReportModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.classList.remove("report-open");
}

function renderWeek(){
  const keys=weekKeys();
  const grid=document.getElementById("weekGrid");
  if(!grid)return;
  const first=parseDateKey(keys[0]),last=parseDateKey(keys[6]);
  document.getElementById("weekRange").textContent=
    `${first.toLocaleDateString("es-ES",{day:"numeric",month:"long"})} – ${last.toLocaleDateString("es-ES",{day:"numeric",month:"long",year:"numeric"})}`;

  const today=dateKeyLocal();
  grid.innerHTML=keys.map(key=>{
    const menu=ensureMenu(key);
    const meals=menuSlotDefs.map(([slot,label])=>{
      const rid=menu[slot], rr=rid?DATA.recipes[rid]:null, name=rr?`${rr.name} · ${rr.code||rr.id}`:"";
      return `<div class="week-meal"><b>${escapeHtml(label)}</b>${name?escapeHtml(name):'<span class="week-empty">—</span>'}</div>`;
    }).join("");
    const coffees=coffeeCountsForDate(key);
    const coffeeLine=(coffees.P01||coffees.P02)
      ? `<div class="week-meal"><b>☕ Cafés</b>${escapeHtml(profileName("P01"))} ${coffees.P01} · ${escapeHtml(profileName("P02"))} ${coffees.P02}</div>`
      : "";
    const j=totalsFor("P01",key), e=totalsFor("P02",key);
    const jw=effectiveWeight("P01",key).weight, ew=effectiveWeight("P02",key).weight;
    const jg=goalsForDate("P01",key), eg=goalsForDate("P02",key);
    return `<div class="week-day ${key===state.selectedDate?"selected":""} ${key===today?"today":""}" data-date="${key}">
      <div class="week-date">${escapeHtml(formatShortDate(key))}</div>
      ${meals}
      ${coffeeLine}
      <div class="week-kcal">
        <strong>${escapeHtml(profileName("P01"))} ${fmt(j.kcal)}/${fmt(jg.kcal)}</strong> · ${fmt(jw,1)} kg<br>
        ${escapeHtml(profileName("P02"))} ${fmt(e.kcal)}/${fmt(eg.kcal)} · ${fmt(ew,1)} kg
      </div>
    </div>`;
  }).join("");
  grid.querySelectorAll(".week-day").forEach(card=>card.onclick=()=>{
    selectDate(card.dataset.date);
    showView("plannerView");
  });
}

function selectDate(key){
  state.selectedDate=key;
  ensureMenu(key);
  syncProfilesFromSettings(key);
  save();
  renderPlanner();
  renderCards();
  renderConfig();
  if(activeRecipe) renderDetail();
}
document.getElementById("prevMonth").onclick=()=>moveSelectedMonth(-1);
document.getElementById("nextMonth").onclick=()=>moveSelectedMonth(1);
document.getElementById("todayBtn").onclick=()=>selectDate(dateKeyLocal());

// Navegación horizontal del menú diario.
// Izquierda = día siguiente. Derecha = día anterior.
// Pointer Events funciona de forma más fiable en Chrome/Android y visores WebView.
(function setupDailySwipe(){
  const area=document.getElementById("dailySwipeArea");
  if(!area)return;

  const MIN_X=48;
  const MAX_Y=95;
  let active=false;
  let startX=0,startY=0,currentX=0,currentY=0,pointerId=null;

  function clearVisual(){
    area.classList.remove("swipe-left","swipe-right");
  }

  function finishSwipe(endX,endY){
    if(!active)return;
    const dx=endX-startX;
    const dy=endY-startY;
    active=false;
    clearVisual();

    const horizontal =
      Math.abs(dx)>=MIN_X &&
      Math.abs(dy)<=MAX_Y &&
      Math.abs(dx)>Math.abs(dy)*1.10;

    if(!horizontal)return;

    if(dx<0){
      selectDate(addDays(state.selectedDate,1));
    }else{
      selectDate(addDays(state.selectedDate,-1));
    }
  }

  if(window.PointerEvent){
    area.addEventListener("pointerdown",e=>{
      if(e.pointerType==="mouse" && e.button!==0)return;
      active=true;
      pointerId=e.pointerId;
      startX=currentX=e.clientX;
      startY=currentY=e.clientY;
      try{ area.setPointerCapture(pointerId); }catch(_){}
    });

    area.addEventListener("pointermove",e=>{
      if(!active || e.pointerId!==pointerId)return;
      currentX=e.clientX;
      currentY=e.clientY;
      const dx=currentX-startX;
      const dy=currentY-startY;

      // Solo animamos cuando el gesto es claramente horizontal.
      if(Math.abs(dx)>22 && Math.abs(dx)>Math.abs(dy)){
        area.classList.toggle("swipe-left",dx<0);
        area.classList.toggle("swipe-right",dx>0);
      }else{
        clearVisual();
      }
    });

    area.addEventListener("pointerup",e=>{
      if(!active || e.pointerId!==pointerId)return;
      // Usamos SIEMPRE la posición final real del dedo.
      finishSwipe(e.clientX,e.clientY);
      try{ area.releasePointerCapture(pointerId); }catch(_){}
      pointerId=null;
    });

    area.addEventListener("pointercancel",()=>{
      active=false;
      pointerId=null;
      clearVisual();
    });
  }else{
    // Fallback para navegadores antiguos.
    area.addEventListener("touchstart",e=>{
      if(e.touches.length!==1)return;
      const t=e.touches[0];
      active=true;
      startX=currentX=t.clientX;
      startY=currentY=t.clientY;
    },{passive:true});

    area.addEventListener("touchmove",e=>{
      if(!active || e.touches.length!==1)return;
      const t=e.touches[0];
      currentX=t.clientX;
      currentY=t.clientY;
      const dx=currentX-startX;
      const dy=currentY-startY;
      if(Math.abs(dx)>22 && Math.abs(dx)>Math.abs(dy)){
        area.classList.toggle("swipe-left",dx<0);
        area.classList.toggle("swipe-right",dx>0);
      }else{
        clearVisual();
      }
    },{passive:true});

    area.addEventListener("touchend",e=>{
      if(!active)return;
      const t=e.changedTouches && e.changedTouches[0];
      // Si no hubo touchmove, changedTouches sigue dando la posición final.
      finishSwipe(t?t.clientX:currentX,t?t.clientY:currentY);
    },{passive:true});

    area.addEventListener("touchcancel",()=>{
      active=false;
      clearVisual();
    },{passive:true});
  }
})();

document.getElementById("prevWeek").onclick=()=>selectDate(addDays(state.selectedDate,-7));
document.getElementById("nextWeek").onclick=()=>selectDate(addDays(state.selectedDate,7));

document.getElementById("openDailyReport").onclick=()=>openDailyReport("summary");
document.getElementById("openDetailedDailyReport").onclick=()=>openDailyReport("detailed");
document.querySelectorAll(".report-mode-btn").forEach(btn=>{
  btn.onclick=()=>renderDailyReport(state.selectedDate,btn.dataset.reportMode);
});
document.querySelectorAll("[data-close-report]").forEach(el=>el.onclick=closeDailyReport);
document.getElementById("printDailyReport").onclick=()=>window.print();
document.getElementById("copyDailyReport").onclick=async()=>{
  const btn=document.getElementById("copyDailyReport");
  const text=dailyReportPlainText(state.selectedDate,dailyReportMode);
  try{
    await navigator.clipboard.writeText(text);
    const old=btn.textContent;
    btn.textContent="Copiado ✓";
    setTimeout(()=>btn.textContent=old,1200);
  }catch(e){
    const ta=document.createElement("textarea");
    ta.value=text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    const old=btn.textContent;
    btn.textContent="Copiado ✓";
    setTimeout(()=>btn.textContent=old,1200);
  }
};
document.addEventListener("keydown",e=>{
  if(e.key==="Escape" && document.getElementById("dailyReportModal").classList.contains("open")){
    closeDailyReport();
  }
});

document.getElementById("resetMenu").onclick=()=>{
  state.menusByDate[state.selectedDate]=emptyMenu();
  state.coffeesByDate[state.selectedDate]={P01:0,P02:0};
  save();renderPlanner();
};


function evoVal(v,d=1){
  return (v==null || v==="") ? "—" : fmt(Number(v),d);
}
function evolutionChart(pid,field,label,unit="",decimals=1){
  const records=state.evolutionRecords?.[pid]||{};
  const points=Object.keys(records).sort().map(date=>({date,value:Number(records[date]?.[field])}))
    .filter(x=>Number.isFinite(x.value));

  if(points.length<2){
    return `<div class="chart-card"><div class="chart-head"><b>${label}</b><span>${points.length?evoVal(points[points.length-1].value,decimals)+unit:"Sin datos"}</span></div><div class="chart-empty">Se necesitan al menos 2 registros</div></div>`;
  }

  const W=420,H=145,L=34,R=10,T=12,B=25;
  let min=Math.min(...points.map(p=>p.value)), max=Math.max(...points.map(p=>p.value));
  if(min===max){min-=1;max+=1}
  const pad=(max-min)*0.10 || 1; min-=pad; max+=pad;
  const x=i=>L+(W-L-R)*(i/(points.length-1));
  const y=v=>T+(H-T-B)*(1-(v-min)/(max-min));
  const poly=points.map((p,i)=>`${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const dots=points.map((p,i)=>`<circle class="chart-dot" cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="${i===points.length-1?3.2:2.0}"/>`).join("");
  const first=parseDateKey(points[0].date).toLocaleDateString("es-ES",{month:"2-digit",year:"2-digit"});
  const last=parseDateKey(points[points.length-1].date).toLocaleDateString("es-ES",{month:"2-digit",year:"2-digit"});
  const latest=points[points.length-1].value;

  return `<div class="chart-card">
    <div class="chart-head"><b>${label}</b><span>Actual: ${evoVal(latest,decimals)}${unit}</span></div>
    <svg class="chart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      <line class="chart-axis" x1="${L}" y1="${T}" x2="${L}" y2="${H-B}"/>
      <line class="chart-axis" x1="${L}" y1="${H-B}" x2="${W-R}" y2="${H-B}"/>
      <text class="chart-label" x="2" y="${T+4}">${evoVal(max,decimals)}</text>
      <text class="chart-label" x="2" y="${H-B}">${evoVal(min,decimals)}</text>
      <text class="chart-label" x="${L}" y="${H-5}">${first}</text>
      <text class="chart-label" text-anchor="end" x="${W-R}" y="${H-5}">${last}</text>
      <polyline class="chart-line" points="${poly}"/>
      ${dots}
    </svg>
  </div>`;
}

function renderEvolution(){
  const el=document.getElementById("evolutionCards");
  if(!el)return;

  el.innerHTML=["P01","P02"].map(pid=>{
    const s=state.profileSettings[pid];
    const records=state.evolutionRecords?.[pid]||{};
    const keys=Object.keys(records).sort().reverse();
    const latest=latestEvolutionRecord(pid,state.selectedDate) || (keys.length?{date:keys[0],...records[keys[0]]}:null);
    const ew=effectiveWeight(pid,state.selectedDate);

    const rows=keys.length ? keys.map(key=>{
      const r=records[key]||{};
      return `<tr>
        <td data-label="Fecha">${parseDateKey(key).toLocaleDateString("es-ES")}</td>
        <td data-label="Peso">${evoVal(r.weight,2)} kg</td><td data-label="Grasa">${evoVal(r.bodyFat,1)} %</td><td data-label="Grasa visceral">${evoVal(r.visceral,0)}</td>
        <td data-label="IMC">${evoVal(r.bmi,1)}</td><td data-label="Músculo">${evoVal(r.muscle,2)} kg</td><td data-label="Proteína">${evoVal(r.protein,1)} %</td>
        <td data-label="Agua">${evoVal(r.water,1)} %</td><td data-label="BMR">${evoVal(r.bmr,0)} kcal</td><td data-label="Masa ósea">${evoVal(r.bone,2)} kg</td>
        <td class="actions">
          <button class="btn soft no-print" type="button" data-edit-evolution="${pid}" data-date="${key}">Editar</button>
          <button class="btn soft no-print" type="button" data-delete-evolution="${pid}" data-date="${key}">Borrar</button>
        </td>
      </tr>`;
    }).join("") : `<tr><td colspan="11" class="empty">Todavía no hay registros.</td></tr>`;

    const current=latest || {};
    return `<div class="panel" style="grid-column:1/-1">
      <div class="person-title">
        <h2 style="margin:0">${escapeHtml(s.name)}</h2>
        <span>${fmt(ew.weight,1)} kg efectivos <span class="source-badge">${ew.source==="evolution"?"Evolución":"Referencia"}</span></span>
      </div>

      <div class="evo-current">
        <div class="evo-kpi"><strong>${evoVal(current.weight,2)} kg</strong><small>Peso</small></div>
        <div class="evo-kpi"><strong>${evoVal(current.bodyFat,1)} %</strong><small>Grasa corporal</small></div>
        <div class="evo-kpi"><strong>${evoVal(current.muscle,2)} kg</strong><small>Músculo</small></div>
        <div class="evo-kpi"><strong>${evoVal(current.visceral,0)}</strong><small>Grasa visceral</small></div>
        <div class="evo-kpi"><strong>${evoVal(current.bmi,1)}</strong><small>IMC</small></div>
        <div class="evo-kpi"><strong>${evoVal(current.protein,1)} %</strong><small>Proteína corporal</small></div>
        <div class="evo-kpi"><strong>${evoVal(current.water,1)} %</strong><small>Agua</small></div>
        <div class="evo-kpi"><strong>${evoVal(current.bmr,0)} kcal</strong><small>Metabolismo basal báscula</small></div>
        <div class="evo-kpi"><strong>${evoVal(current.bone,2)} kg</strong><small>Masa ósea</small></div>
      </div>

      <h3>Nuevo registro / editar</h3>
      <div class="evolution-form">
        <div class="field"><label>Fecha</label><input type="date" data-evo-date="${pid}" value="${state.selectedDate}"></div>
        <div class="field"><label>Peso (kg) *</label><input type="number" min="35" max="250" step="0.01" data-evo-field="weight" data-pid="${pid}"></div>
        <div class="field"><label>Grasa corporal (%)</label><input type="number" step="0.1" data-evo-field="bodyFat" data-pid="${pid}"></div>
        <div class="field"><label>Grasa visceral</label><input type="number" step="1" data-evo-field="visceral" data-pid="${pid}"></div>
        <div class="field"><label>IMC</label><input type="number" step="0.1" data-evo-field="bmi" data-pid="${pid}"></div>
        <div class="field"><label>Músculo (kg)</label><input type="number" step="0.01" data-evo-field="muscle" data-pid="${pid}"></div>
        <div class="field"><label>Proteína corporal (%)</label><input type="number" step="0.1" data-evo-field="protein" data-pid="${pid}"></div>
        <div class="field"><label>Agua (%)</label><input type="number" step="0.1" data-evo-field="water" data-pid="${pid}"></div>
        <div class="field"><label>Metabolismo basal báscula (kcal)</label><input type="number" step="1" data-evo-field="bmr" data-pid="${pid}"></div>
        <div class="field"><label>Masa ósea (kg)</label><input type="number" step="0.01" data-evo-field="bone" data-pid="${pid}"></div>
      </div>
      <div class="evolution-form-actions no-print">
        <button class="btn primary" type="button" data-save-evolution="${pid}">Guardar registro</button>
        <button class="btn soft" type="button" data-clear-evolution-form="${pid}">Limpiar</button>
      </div>

      <div class="charts-grid">
        ${evolutionChart(pid,"weight","Peso"," kg",2)}
        ${evolutionChart(pid,"bodyFat","Grasa corporal"," %",1)}
        ${evolutionChart(pid,"muscle","Músculo"," kg",2)}
        ${evolutionChart(pid,"bmi","IMC","",1)}
        ${evolutionChart(pid,"visceral","Grasa visceral","",0)}
        ${evolutionChart(pid,"protein","Proteína corporal"," %",1)}
        ${evolutionChart(pid,"water","Agua"," %",1)}
        ${evolutionChart(pid,"bmr","Metabolismo basal báscula"," kcal",0)}
        ${evolutionChart(pid,"bone","Masa ósea"," kg",2)}
      </div>

      <div class="evolution-history">
        <h3>Histórico completo</h3>
        <table class="evolution-table">
          <thead><tr><th>Fecha</th><th>Kg</th><th>% grasa</th><th>G. visc.</th><th>IMC</th><th>Músculo</th><th>% proteína</th><th>% agua</th><th>BMR</th><th>Hueso</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
  }).join("");

  function formValue(pid,field){
    const input=el.querySelector(`[data-evo-field="${field}"][data-pid="${pid}"]`);
    if(!input || input.value==="") return null;
    const n=Number(input.value);
    return Number.isFinite(n)?n:null;
  }
  function clearForm(pid){
    el.querySelector(`[data-evo-date="${pid}"]`).value=state.selectedDate;
    el.querySelectorAll(`[data-evo-field][data-pid="${pid}"]`).forEach(i=>i.value="");
  }

  el.querySelectorAll("[data-save-evolution]").forEach(btn=>btn.onclick=()=>{
    const pid=btn.dataset.saveEvolution;
    const date=el.querySelector(`[data-evo-date="${pid}"]`).value;
    if(!date) return alert("Selecciona una fecha.");
    const weight=formValue(pid,"weight");
    if(!(weight>=35 && weight<=250)) return alert("Introduce un peso válido.");

    const rec={weight};
    ["bodyFat","visceral","bmi","muscle","protein","water","bmr","bone"].forEach(field=>{
      const v=formValue(pid,field);
      if(v!=null)rec[field]=v;
    });
    state.evolutionRecords[pid][date]=rec;
    save();
    syncProfilesFromSettings(state.selectedDate);
    renderEvolution();renderPlanner();renderConfig();renderCards();
    if(activeRecipe) renderDetail();
    if(document.getElementById("shoppingView").classList.contains("active")) renderShopping();
  });

  el.querySelectorAll("[data-edit-evolution]").forEach(btn=>btn.onclick=()=>{
    const pid=btn.dataset.editEvolution,date=btn.dataset.date;
    const rec=state.evolutionRecords[pid][date]||{};
    el.querySelector(`[data-evo-date="${pid}"]`).value=date;
    el.querySelectorAll(`[data-evo-field][data-pid="${pid}"]`).forEach(i=>{
      const v=rec[i.dataset.evoField];
      i.value=(v==null?"":v);
    });
    el.querySelector(`[data-evo-date="${pid}"]`).scrollIntoView({behavior:"smooth",block:"center"});
  });

  el.querySelectorAll("[data-delete-evolution]").forEach(btn=>btn.onclick=()=>{
    const pid=btn.dataset.deleteEvolution,date=btn.dataset.date;
    delete state.evolutionRecords[pid][date];
    save();
    syncProfilesFromSettings(state.selectedDate);
    renderEvolution();renderPlanner();renderConfig();renderCards();
    if(activeRecipe) renderDetail();
  });

  el.querySelectorAll("[data-clear-evolution-form]").forEach(btn=>btn.onclick=()=>clearForm(btn.dataset.clearEvolutionForm));
}

function renderConfig(){
  const el=document.getElementById("configCards");
  if(!el)return;
  const activityOptions=[
    [1.20,"Sedentaria · 1,20"],
    [1.35,"Ligera · 1,35"],
    [1.50,"Moderada · 1,50"],
    [1.70,"Alta · 1,70"],
    [1.90,"Muy alta · 1,90"]
  ];

  el.innerHTML=Object.entries(state.profileSettings).map(([pid,s])=>{
    const x=profileCalc(pid,state.selectedDate);
    const carbsWarn=x.carbs<=0?'<div class="warning">Con estos ajustes no quedan calorías disponibles para hidratos. Reduce el déficit o los objetivos de proteína/grasa.</div>':'';
    return `<div class="panel">
      <h2>${escapeHtml(profileName(pid))}</h2>
      ${x.weightSource==="unconfigured"?'<p class="small">Completa tu perfil para calcular objetivos personales. Mientras tanto se muestran las referencias del recetario.</p>':""}
      <div class="config-form">
        <div class="field"><label>Nombre</label><input data-pid="${pid}" data-field="name" value="${escapeHtml(s.name)}"></div>
        <div class="field"><label>Sexo para la fórmula</label>
          <select data-pid="${pid}" data-field="sex">
            <option value="" ${!s.sex?"selected":""}>Selecciona</option>
            <option value="male" ${s.sex==="male"?"selected":""}>Hombre</option>
            <option value="female" ${s.sex==="female"?"selected":""}>Mujer</option>
          </select>
        </div>
        <div class="field"><label>Edad (años)</label><input type="number" min="18" max="100" step="1" data-pid="${pid}" data-field="age" value="${s.age??""}"></div>
        <div class="field"><label>Altura (cm)</label><input type="number" min="130" max="230" step="1" data-pid="${pid}" data-field="height" value="${s.height??""}"></div>
        <div class="field"><label>Peso inicial / referencia (kg)</label><input type="number" min="35" max="250" step="0.1" data-pid="${pid}" data-field="weight" value="${s.weight??""}"><div class="small">Solo se usa antes del primer pesaje registrado en Evolución.</div></div>
        <div class="field"><label>Actividad habitual</label>
          <select data-pid="${pid}" data-field="activity">
            ${activityOptions.map(([v,l])=>`<option value="${v}" ${Number(s.activity)===v?"selected":""}>${l}</option>`).join("")}
          </select>
        </div>

        <div class="field full">
          <label>Déficit energético: <b>${fmt(s.deficit)} %</b></label>
          <div class="range-row">
            <input type="range" min="0" max="25" step="1" data-pid="${pid}" data-field="deficit" value="${s.deficit}">
            <input type="number" min="0" max="25" step="1" data-pid="${pid}" data-field="deficit" value="${s.deficit}">
          </div>
        </div>

        <div class="field full">
          <label>Proteína: <b>${fmt(s.proteinKg,2)} g/kg</b></label>
          <div class="range-row">
            <input type="range" min="1.0" max="2.4" step="0.05" data-pid="${pid}" data-field="proteinKg" value="${s.proteinKg}">
            <input type="number" min="1.0" max="2.4" step="0.05" data-pid="${pid}" data-field="proteinKg" value="${s.proteinKg}">
          </div>
        </div>

        <div class="field full">
          <label>Grasa objetivo: <b>${fmt(s.fatKg,2)} g/kg · ${fmt(x.fat)} g/día</b></label>
          <div class="range-row">
            <input type="range" min="0.50" max="0.90" step="0.01" data-pid="${pid}" data-field="fatKg" value="${s.fatKg}">
            <input type="number" min="0.50" max="0.90" step="0.01" data-pid="${pid}" data-field="fatKg" value="${s.fatKg}">
          </div>
          <div class="small">Proteína y grasa se fijan por kg de peso. Los hidratos completan las calorías restantes.</div>
        </div>
      </div>

      <div class="calcbox">
        <div class="small" style="margin-bottom:8px">
          Para la fecha seleccionada: <b>${fmt(x.weight,1)} kg efectivos</b>
          ${x.weightSource==="evolution" && x.weightDate
              ? ` · Evolución desde ${parseDateKey(x.weightDate).toLocaleDateString("es-ES")}`
              : " · peso inicial de referencia"}
        </div>
        <div class="calcgrid">
          <div class="calcitem"><strong>${fmt(x.bmr)}</strong><small>Metabolismo basal</small></div>
          <div class="calcitem"><strong>${fmt(x.tdee)}</strong><small>Mantenimiento estimado</small></div>
          <div class="calcitem"><strong>${fmt(x.target)}</strong><small>Objetivo kcal</small></div>
          <div class="calcitem"><strong>${fmt(x.tdee-x.target)}</strong><small>Déficit kcal/día</small></div>
        </div>
        <div class="profile-kpis" style="margin-top:10px">
          <div class="kpi"><strong>${fmt(x.protein)} g</strong><small>Proteína</small></div>
          <div class="kpi"><strong>${fmt(x.carbs)} g</strong><small>Hidratos</small></div>
          <div class="kpi"><strong>${fmt(x.fat)} g</strong><small>Grasa</small></div>
          <div class="kpi"><strong>${fmt(x.target)}</strong><small>kcal/día</small></div>
        </div>
        ${carbsWarn}
      </div>
    </div>`;
  }).join("");

  el.querySelectorAll("[data-pid][data-field]").forEach(inp=>{
    const commit=()=>{
      const pid=inp.dataset.pid,field=inp.dataset.field;
      let value=inp.value;
      if(!["name","sex"].includes(field)) value=Number(value);
      state.profileSettings[pid][field]=value;
      syncProfilesFromSettings(state.selectedDate);
      save();

      // Recalcular todo lo que depende del perfil y de las raciones.
      renderAllForDate();
    };
    // Evita que un campo numérico se redibuje mientras aún se está escribiendo.
    inp.onchange=commit;
  });
}
document.getElementById("resetConfig").onclick=()=>{
  state.profileSettings=JSON.parse(JSON.stringify(DEFAULT_PROFILE_SETTINGS));
  syncProfilesFromSettings(state.selectedDate);
  save();
  renderAllForDate();
};

function renderFilters(){
  const types=["TODAS",...new Set(Object.values(DATA.recipes).map(r=>r.type))];
  document.getElementById("typeFilters").innerHTML=types.map(t=>`<button class="pill ${t===activeType?"active":""}" data-t="${t}">${t}</button>`).join("");
  document.querySelectorAll("#typeFilters .pill").forEach(b=>b.onclick=()=>{activeType=b.dataset.t;renderFilters();renderCards();});
}
function renderCards(){
  const q=document.getElementById("search").value.trim().toLowerCase();
  const rs=Object.values(DATA.recipes).filter(r=>{
    if(activeType!=="TODAS"&&r.type!==activeType)return false;
    const ingredientText=(r.portions.P01||[]).map(x=>x.food).join(" ");
    return !q || ((r.code||r.id)+" "+r.name+" "+r.tags.join(" ")+" "+ingredientText).toLowerCase().includes(q);
  });
  const el=document.getElementById("recipeCards");
  el.innerHTML=rs.length?rs.map(r=>{
    const s=scaledRecipeSummary(r,"P01"), img=getRecipeImg(r.id);
    return `<article class="card recipe-card">
      <div class="recipe-cover">${img?`<img src="${img}" alt="">`:`<div class="recipe-placeholder">🍽️</div>`}</div>
      <div class="cardbody">
        <span class="tag">${r.type}</span>${r.tags.slice(0,2).map(t=>`<span class="tag">${t}</span>`).join("")}
        <div class="recipe-title">${escapeHtml(r.name)} <span class="recipe-code">${escapeHtml(r.code||r.id)}</span></div>
        ${macroBoxes(s)}
        ${macroBar(s)}
        <div style="margin-top:13px"><button class="btn primary" onclick="openRecipe('${r.id}')">Ver receta</button></div>
      </div>
    </article>`;
  }).join(""):`<div class="empty">No hay recetas que coincidan.</div>`;
}
document.getElementById("search").oninput=renderCards;

function alignedIngredients(r){
  const map=new Map();
  ["P01","P02"].forEach(pid=>{
    (r.portions[pid]||[]).forEach(x=>{
      if(!map.has(x.food_id))map.set(x.food_id,{food_id:x.food_id,food:x.food,p1:null,p2:null});
      map.get(x.food_id)[pid==="P01"?"p1":"p2"]=x;
    });
  });
  return [...map.values()];
}
function openRecipe(id){
  activeRecipe=id;activePerson="P01";renderDetail();showView("detailView");
}
window.openRecipe=openRecipe;

function recipeAdjustmentControls(r,pid){
  const base=scaledRecipeSummaryBase(r,pid,state.selectedDate),adj=getRecipeAdjustment(r.id,pid,state.selectedDate),cur=scaledRecipeSummary(r,pid,state.selectedDate);
  const mode=adj.mode||"simple",target=Math.round((adj.targetKcal&&adj.targetKcal>0)?adj.targetKcal:base.kcal);
  const bp=Math.round(base.p_pct*100),bc=Math.round(base.c_pct*100),bf=100-bp-bc;
  const p=adj.pPct!=null?Number(adj.pPct):bp,c=adj.cPct!=null?Number(adj.cPct):bc,f=adj.fPct!=null?Number(adj.fPct):bf,sum=p+c+f;
  return `<div class="adjust-box">
    <div class="adjust-head"><div><b>Ajustar esta ración</b><div class="small">${parseDateKey(state.selectedDate).toLocaleDateString("es-ES")} · ${escapeHtml(profileName(pid))}</div></div>
    <div class="adjust-mode"><button type="button" data-adjust-mode="simple" class="${mode==="simple"?"active":""}">Simple</button><button type="button" data-adjust-mode="advanced" class="${mode==="advanced"?"active":""}">Avanzado</button></div></div>
    <div class="adjust-grid"><div class="adjust-field"><label>Calorías objetivo</label><input type="number" min="${Math.max(100,Math.round(base.kcal*.55))}" max="${Math.round(base.kcal*1.55)}" step="5" id="recipeTargetKcal" value="${target}"></div><div class="adjust-field"><label>Referencia automática</label><input value="${Math.round(base.kcal)} kcal" disabled></div></div>
    ${mode==="advanced"?`<div style="margin-top:12px"><div class="small" style="margin-bottom:6px">Porcentaje de calorías por macro (debe sumar 100 %)</div><div class="macro-inputs"><div class="adjust-field"><label>Proteína %</label><input type="number" min="10" max="60" id="adjPPct" value="${p}"></div><div class="adjust-field"><label>HC %</label><input type="number" min="10" max="75" id="adjCPct" value="${c}"></div><div class="adjust-field"><label>Grasa %</label><input type="number" min="10" max="60" id="adjFPct" value="${f}"></div></div><div class="adjust-note">Total: <b>${sum}%</b></div></div>`:""}
    <div class="adjust-summary"><b>Resultado:</b> ${Math.round(cur.kcal)} kcal · ${fmt(cur.protein,1)} g P · ${fmt(cur.carbs,1)} g HC · ${fmt(cur.fat,1)} g grasa</div>
    <div class="config-actions no-print"><button class="btn primary" type="button" id="applyRecipeAdjust">Aplicar</button><button class="btn soft" type="button" id="resetRecipeAdjust">Restaurar receta</button></div>
    <div class="adjust-note">🔒 Los ingredientes fijos mantienen sus gramos. Cuando la receta dispone de valores nutricionales por alimento, el Resultado se recalcula directamente desde las cantidades finales mostradas. Si así no se puede alcanzar la kcal objetivo, prevalece el resultado real.</div>
  </div>`;
}

function renderDetail(){
  const r=DATA.recipes[activeRecipe], s=scaledRecipeSummary(r,activePerson), img=getRecipeImg(r.id);
  const rows=alignedIngredients(r);
  const who=escapeHtml(profileName(activePerson));
  document.getElementById("recipeDetail").innerHTML=`
  <div class="detail">
    <div>
      <div class="panel">
        <span class="tag">${r.type}</span>${r.tags.slice(0,4).map(t=>`<span class="tag">${t}</span>`).join("")}
        <h1>${escapeHtml(r.name)} <span class="recipe-code">${escapeHtml(r.code||r.id)}</span></h1>
        <div class="person-tabs no-print">
          <button data-p="P01" class="${activePerson==="P01"?"active":""}">${escapeHtml(profileName("P01"))}</button>
          <button data-p="P02" class="${activePerson==="P02"?"active":""}">${escapeHtml(profileName("P02"))}</button>
        </div>
        ${macroBoxes(s)}
        ${macroBar(s)}
        ${recipeAdjustmentControls(r,activePerson)}
        <h2 style="margin-top:22px">Ingredientes · ${who}</h2>
        <table class="ingredient-table"><thead><tr><th>Ingrediente</th><th>Cantidad</th><th>Nota</th><th>Fijo</th></tr></thead>
        <tbody>${rows.map(row=>{
          const x=activePerson==="P01"?row.p1:row.p2;
          return x?`<tr>
            <td data-label="Ingrediente">${escapeHtml(x.food)}</td>
            <td data-label="Cantidad"><b>${fmt(scaledIngredientGrams(x,activePerson,state.selectedDate,r.id),1).replace(",0","")} g</b></td>
            <td data-label="Nota">${escapeHtml(x.note||"")}</td>
            <td data-label="Fijo" class="lock-cell"><label class="lock-wrap"><input type="checkbox" data-lock-food="${x.food_id}" ${isFoodLocked(r.id,x.food_id)?"checked":""} ${isHardLockedFood(r.id,x.food_id)?"disabled title=\"Unidad indivisible\"":""}> ${isHardLockedFood(r.id,x.food_id)?"🔐":"🔒"}</label></td>
          </tr>`:"";
        }).join("")}</tbody></table>
        <div class="note" style="margin-top:18px">
          ${(()=>{
            const g=goalsForDate(activePerson,state.selectedDate);
            const w=effectiveWeight(activePerson,state.selectedDate);
            return `Ración adaptada al ${parseDateKey(state.selectedDate).toLocaleDateString("es-ES")} con ${fmt(w.weight,1)} kg:
            ${fmt(g.kcal)} kcal/día, ${fmt(g.protein)} g proteína, ${fmt(g.carbs)} g HC y ${fmt(g.fat)} g grasa.`;
          })()}
        </div>
        <h2 style="margin-top:22px">Preparación / notas</h2>
        <div class="note">${escapeHtml(r.notes)}</div>
      </div>
    </div>
    <aside>
      <div class="detail-cover">${img?`<img src="${img}" alt="">`:`<div class="recipe-placeholder">🍽️</div>`}</div>
      <label class="btn soft filelab no-print">Añadir/cambiar foto<input type="file" accept="image/*" id="recipePhoto"></label>
      <div class="panel" style="margin-top:14px">
        <h2>Cantidades para los dos${isJointMixRecipe(r)?" · mezcla conjunta":" · reparto individual"}</h2>
        ${(()=>{
          const joint=isJointMixRecipe(r);
          const mixRows=rows.map(row=>{
            const g1=row.p1?scaledIngredientGrams(row.p1,"P01",state.selectedDate,r.id):0;
            const g2=row.p2?scaledIngredientGrams(row.p2,"P02",state.selectedDate,r.id):0;
            const total=g1+g2;
            const p1=total>0?g1/total*100:0;
            const p2=total>0?g2/total*100:0;
            return {food:row.food,g1,g2,total,p1,p2};
          });
          const sumJ=mixRows.reduce((a,x)=>a+x.g1,0);
          const sumE=mixRows.reduce((a,x)=>a+x.g2,0);
          const sumT=sumJ+sumE;
          const shareJ=sumT>0?sumJ/sumT*100:0;
          const shareE=sumT>0?sumE/sumT*100:0;

          return `<div class="mix-table-wrap">
            <table class="ingredient-table mix-table">
              <thead><tr>
                <th>Ingrediente</th>
                <th>${escapeHtml(profileName("P01"))}</th><th>%</th>
                <th>${escapeHtml(profileName("P02"))}</th><th>%</th>
                <th>Total</th>
              </tr></thead>
              <tbody>
                ${mixRows.map(x=>`<tr>
                  <td data-label="Ingrediente">${escapeHtml(x.food)}</td>
                  <td data-label="${escapeHtml(profileName("P01"))}"><b>${fmt(x.g1,1).replace(",0","")} g</b></td>
                  <td data-label="% ${escapeHtml(profileName("P01"))}">${fmt(x.p1,1).replace(",0","")}%</td>
                  <td data-label="${escapeHtml(profileName("P02"))}"><b>${fmt(x.g2,1).replace(",0","")} g</b></td>
                  <td data-label="% ${escapeHtml(profileName("P02"))}">${fmt(x.p2,1).replace(",0","")}%</td>
                  <td data-label="Total"><b>${fmt(x.total,1).replace(",0","")} g</b></td>
                </tr>`).join("")}
                ${joint?`<tr class="mix-total">
                  <td data-label="Reparto">TOTAL / REPARTO DE LA MEZCLA</td>
                  <td data-label="${escapeHtml(profileName("P01"))}">${fmt(sumJ,1).replace(",0","")} g</td>
                  <td data-label="% ${escapeHtml(profileName("P01"))}" class="mix-share">${fmt(shareJ,1).replace(",0","")}%</td>
                  <td data-label="${escapeHtml(profileName("P02"))}">${fmt(sumE,1).replace(",0","")} g</td>
                  <td data-label="% ${escapeHtml(profileName("P02"))}" class="mix-share">${fmt(shareE,1).replace(",0","")}%</td>
                  <td data-label="Total">${fmt(sumT,1).replace(",0","")} g</td>
                </tr>`:""}
              </tbody>
            </table>
          </div>
          ${joint?`<div class="mix-help">
            <b>Mezcla conjunta activa.</b> Cocina todo junto, pesa el resultado final y reparte <b>${fmt(shareJ,1).replace(",0","")}% para ${escapeHtml(profileName("P01"))}</b> y <b>${fmt(shareE,1).replace(",0","")}% para ${escapeHtml(profileName("P02"))}</b>. Todos los ingredientes y macros usan este mismo reparto. Si cambia el déficit o el objetivo, Nutriplan recalcula el porcentaje y compensa el resto del día con las comidas individuales.
          </div>`:`<div class="mix-help">
            <b>Reparto individual.</b> Sirve a cada uno las cantidades indicadas por ingrediente. El porcentaje de cada fila es solo informativo; no uses un porcentaje global de la receta.
          </div>`}`;
        })()}
      </div>
    </aside>
  </div>`;
  document.querySelectorAll(".person-tabs button").forEach(b=>b.onclick=()=>{activePerson=b.dataset.p;renderDetail();});
  document.querySelectorAll("[data-adjust-mode]").forEach(btn=>btn.onclick=()=>{
    const cur=getRecipeAdjustment(r.id,activePerson,state.selectedDate);setRecipeAdjustment(r.id,activePerson,{...cur,mode:btn.dataset.adjustMode},state.selectedDate);save();renderDetail();
  });
  document.querySelectorAll("[data-lock-food]").forEach(cb=>cb.onchange=()=>{
    toggleRecipeLock(r.id,cb.dataset.lockFood,cb.checked);renderDetail();renderPlanner();renderWeek();if(document.getElementById("shoppingView").classList.contains("active"))renderShopping();
  });
  const applyBtn=document.getElementById("applyRecipeAdjust");
  if(applyBtn)applyBtn.onclick=()=>{
    const cur=getRecipeAdjustment(r.id,activePerson,state.selectedDate),next={...cur,targetKcal:Number(document.getElementById("recipeTargetKcal").value)};
    if((cur.mode||"simple")==="advanced"){
      const pPct=Number(document.getElementById("adjPPct").value),cPct=Number(document.getElementById("adjCPct").value),fPct=Number(document.getElementById("adjFPct").value);
      if(Math.abs((pPct+cPct+fPct)-100)>.5){alert("Los porcentajes deben sumar 100 %.");return;}
      next.pPct=pPct;next.cPct=cPct;next.fPct=fPct;
    }
    setRecipeAdjustment(r.id,activePerson,next,state.selectedDate);save();renderDetail();renderPlanner();renderWeek();renderCards();if(document.getElementById("shoppingView").classList.contains("active"))renderShopping();
  };
  const resetBtn=document.getElementById("resetRecipeAdjust");
  if(resetBtn)resetBtn.onclick=()=>{clearRecipeAdjustment(r.id,activePerson,state.selectedDate);save();renderDetail();renderPlanner();renderWeek();renderCards();if(document.getElementById("shoppingView").classList.contains("active"))renderShopping();};
  const input=document.getElementById("recipePhoto");
  if(input)input.onchange=e=>saveImage(r.id,e.target.files[0]);
}
function saveImage(id,file){
  if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const im=new Image();
    im.onload=()=>{
      const maxW=1000,maxH=700,scale=Math.min(1,maxW/im.width,maxH/im.height);
      const c=document.createElement("canvas"); c.width=im.width*scale;c.height=im.height*scale;
      c.getContext("2d").drawImage(im,0,0,c.width,c.height);
      localStorage.setItem(recipeImgKey(id),c.toDataURL("image/jpeg",.78));
      renderDetail();renderCards();
    }; im.src=e.target.result;
  }; reader.readAsDataURL(file);
}
document.getElementById("backRecipes").onclick=()=>showView("recipesView");

function aggregateShopping(){
  const agg={};
  weekKeys().forEach(dateKey=>{
    const menu=ensureMenu(dateKey);
    Object.values(menu).filter(Boolean).forEach(rid=>{
      const r=DATA.recipes[rid];
      if(!r)return;
      ["P01","P02"].forEach(pid=>(r.portions[pid]||[]).forEach(x=>{
        const a=agg[x.food_id] ||= {food_id:x.food_id,name:x.food,grams:0};
        a.grams+=scaledIngredientGrams(x,pid,dateKey,r.id);
      }));
    });
  });
  return Object.values(agg).sort((a,b)=>a.name.localeCompare(b.name,"es"));
}
function renderShopping(){
  const items=aggregateShopping(),el=document.getElementById("shoppingList");
  if(!items.length){el.innerHTML='<div class="empty">No hay recetas planificadas en esta semana.</div>';return;}
  el.innerHTML=items.map(x=>{
    const f=DATA.foods[x.food_id]||{},checked=!!state.checks[x.food_id];
    let pack="";
    if(f.pack_g){
      const units=Math.ceil(x.grams/f.pack_g);
      pack=` · <b>${units} ${escapeHtml(f.pack_unit||"envase")}${units>1?"s":""}</b>`;
    }
    return `<div class="shopping-row ${checked?"done":""}">
      <input type="checkbox" data-id="${x.food_id}" ${checked?"checked":""}>
      <div><b>${escapeHtml(x.name)}</b><div class="small">${escapeHtml(f.pack_notes||f.source||"")}</div></div>
      <div class="qty">${fmt(x.grams,1).replace(",0","")} g${pack}</div>
    </div>`;
  }).join("");
  el.querySelectorAll('input[type="checkbox"]').forEach(c=>c.onchange=()=>{state.checks[c.dataset.id]=c.checked;save();renderShopping();});
}
document.getElementById("clearChecks").onclick=()=>{state.checks={};save();renderShopping();};

syncProfilesFromSettings(state.selectedDate);
ensureMenu(state.selectedDate);
save();
renderPlanner();renderFilters();renderCards();renderConfig();renderEvolution();


/* ==========================================================
   PWA / instalación / actualizaciones / copia de seguridad
   ========================================================== */
let deferredPwaInstallPrompt=null;
function isPwaStandalone(){
  return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone===true;
}
function pwaToast(message,ms=2600){
  document.querySelector('.pwa-update-toast')?.remove();
  const el=document.createElement('div');
  el.className='pwa-update-toast';el.textContent=message;
  document.body.appendChild(el);setTimeout(()=>el.remove(),ms);
}
function renderPwaStatus(){
  const installed=isPwaStandalone();
  const badge=document.getElementById('pwaInstallState');
  const mode=document.getElementById('pwaModeText');
  const version=document.getElementById('pwaDataVersion');
  const install=document.getElementById('installPwaBtn');
  if(badge){badge.textContent=installed?'Instalada':'Web';}
  if(mode){mode.textContent=installed?'Aplicación instalada':'Navegador / PWA';}
  if(version){version.textContent=(window.NUTRIPLAN_DATA?.version||DATA?.version||'Base cargada');}
  if(install){install.hidden=installed || !deferredPwaInstallPrompt;}
}
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();deferredPwaInstallPrompt=e;renderPwaStatus();
});
window.addEventListener('appinstalled',()=>{
  deferredPwaInstallPrompt=null;renderPwaStatus();pwaToast('Nutriplan se ha instalado correctamente.');
});

async function installNutriplanPwa(){
  if(!deferredPwaInstallPrompt){
    pwaToast(isPwaStandalone()?'Nutriplan ya está instalada.':'En Chrome, abre el menú ⋮ y elige “Instalar aplicación” si está disponible.',3800);
    return;
  }
  deferredPwaInstallPrompt.prompt();
  try{await deferredPwaInstallPrompt.userChoice;}catch(_){ }
  deferredPwaInstallPrompt=null;renderPwaStatus();
}

function buildNutriplanBackup(){
  const recipeImages={};
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(key?.startsWith('nutriplan_img_')) recipeImages[key]=localStorage.getItem(key);
  }
  return {
    format:'NutriplanBackup',
    backupVersion:1,
    exportedAt:new Date().toISOString(),
    dataVersion:window.NUTRIPLAN_DATA?.version||DATA?.version||null,
    state:JSON.parse(JSON.stringify(state)),
    recipeImages
  };
}
function exportNutriplanBackup(){
  const payload=buildNutriplanBackup();
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  const stamp=new Date().toISOString().slice(0,10);
  a.href=URL.createObjectURL(blob);a.download=`nutriplan-backup-${stamp}.json`;
  document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(a.href);
  pwaToast('Copia de seguridad exportada.');
}
async function importNutriplanBackup(file){
  if(!file)return;
  let payload;
  try{payload=JSON.parse(await file.text());}catch(_){alert('El archivo no contiene un JSON válido.');return;}
  if(payload?.format!=='NutriplanBackup' || !payload.state){alert('El archivo no es una copia de seguridad válida de Nutriplan.');return;}
  if(!confirm('La importación sustituirá los menús, evolución y ajustes locales actuales. ¿Continuar?'))return;
  localStorage.setItem('nutriplan_state',JSON.stringify(payload.state));
  Object.entries(payload.recipeImages||{}).forEach(([key,value])=>{
    if(key.startsWith('nutriplan_img_') && typeof value==='string')localStorage.setItem(key,value);
  });
  location.reload();
}

async function checkPwaUpdate(){
  if(!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)){
    pwaToast('Las actualizaciones automáticas se activan cuando Nutriplan está publicada por HTTPS.',4200);return;
  }
  try{
    const reg=await navigator.serviceWorker.getRegistration();
    if(reg) await reg.update();
    // La base de recetas usa network-first en el Service Worker.
    await fetch('./nutriplan-data.js',{cache:'no-store'});
    pwaToast('Comprobación terminada. Si había una versión nueva, se usará al recargar.',4000);
  }catch(_){pwaToast('No se pudo comprobar ahora. La versión local sigue disponible.',3500);}
}

if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
  window.addEventListener('load',async()=>{
    try{
      const reg=await navigator.serviceWorker.register('./service-worker.js',{scope:'./'});
      reg.addEventListener('updatefound',()=>{
        const worker=reg.installing;
        worker?.addEventListener('statechange',()=>{
          if(worker.state==='installed' && navigator.serviceWorker.controller){
            pwaToast('Hay una actualización de Nutriplan lista. Recarga la app para aplicarla.',5000);
          }
        });
      });
    }catch(err){console.warn('Service Worker no disponible:',err);}
  });
}

document.getElementById('installPwaBtn')?.addEventListener('click',installNutriplanPwa);
document.getElementById('exportBackupBtn')?.addEventListener('click',exportNutriplanBackup);
document.getElementById('importBackupInput')?.addEventListener('change',e=>importNutriplanBackup(e.target.files?.[0]));
document.getElementById('checkPwaUpdateBtn')?.addEventListener('click',checkPwaUpdate);
renderPwaStatus();
if(recoveringState){
  pwaToast(recoverySaveFailed
    ? 'El estado original está dañado y se ha conservado. No se pudo guardar la recuperación: los cambios solo están en memoria. Exporta una copia antes de cerrar.'
    : 'El estado original está dañado y se ha conservado. Estás usando una recuperación independiente; puedes exportarla desde Configuración.',12000);
}
