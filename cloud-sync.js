/* ==========================================================
   Sincronización privada entre dispositivos (Supabase)
   ========================================================== */
const CLOUD_SYNC_CONFIG_KEY='nutriplan_cloud_sync_config';
const CLOUD_SYNC_DEFAULT_CONFIG={
  url:'https://mzznmbpqfvrbswpcnzbq.supabase.co',
  anonKey:'sb_publishable_0MRb-niAfrIoUfMUiEQGvA_pmYaP12S'
};
const CLOUD_SYNC_SESSION_KEY='nutriplan_cloud_sync_session';
const CLOUD_SYNC_META_KEY='nutriplan_cloud_sync_meta';
var cloudSyncReady=false;
var cloudSyncTimer=null;
var cloudSyncBusy=false;
var cloudSyncPoll=null;

function cloudReadJson(key,fallback=null){
  try{
    const raw=localStorage.getItem(key);
    return raw==null?fallback:JSON.parse(raw);
  }catch(_){return fallback;}
}
function cloudSyncConfig(){
  const raw=cloudReadJson(CLOUD_SYNC_CONFIG_KEY,null) || CLOUD_SYNC_DEFAULT_CONFIG;
  if(!raw?.url || !raw?.anonKey)return null;
  return {
    url:String(raw.url).trim().replace(/\/+$/,''),
    anonKey:String(raw.anonKey).trim()
  };
}
function cloudSyncSession(){
  const session=cloudReadJson(CLOUD_SYNC_SESSION_KEY,null);
  return session?.access_token && session?.user?.id ? session : null;
}
function cloudSyncMeta(){
  return {
    userId:null,
    initialized:false,
    needsChoice:false,
    conflict:false,
    lastRemoteUpdatedAt:null,
    lastSyncedFingerprint:null,
    lastSyncAt:null,
    ...(cloudReadJson(CLOUD_SYNC_META_KEY,{})||{})
  };
}
function cloudSetMeta(patch){
  const next={...cloudSyncMeta(),...patch};
  localStorage.setItem(CLOUD_SYNC_META_KEY,JSON.stringify(next));
  renderCloudSyncStatus();
  return next;
}
function cloudResetMetaForUser(userId){
  const current=cloudSyncMeta();
  if(current.userId===userId)return current;
  const next={
    userId,
    initialized:false,
    needsChoice:false,
    conflict:false,
    lastRemoteUpdatedAt:null,
    lastSyncedFingerprint:null,
    lastSyncAt:null
  };
  localStorage.setItem(CLOUD_SYNC_META_KEY,JSON.stringify(next));
  return next;
}
function cloudStoreSession(session){
  if(!session?.access_token || !session?.user?.id)return null;
  const normalized={
    ...session,
    expires_at:Number(session.expires_at)||Math.floor(Date.now()/1000)+(Number(session.expires_in)||3600)
  };
  localStorage.setItem(CLOUD_SYNC_SESSION_KEY,JSON.stringify(normalized));
  cloudResetMetaForUser(normalized.user.id);
  return normalized;
}
function cloudClearSession(){
  localStorage.removeItem(CLOUD_SYNC_SESSION_KEY);
  renderCloudSyncStatus();
}
function cloudErrorMessage(data,status){
  if(typeof data==='string' && data.trim())return data;
  return data?.msg || data?.error_description || data?.message || data?.error || `Error ${status}`;
}
async function cloudParseResponse(response){
  const text=await response.text();
  let data=null;
  try{data=text?JSON.parse(text):null;}catch(_){data=text;}
  if(!response.ok)throw new Error(cloudErrorMessage(data,response.status));
  return data;
}
async function cloudAuthRequest(path,body,accessToken=null){
  const config=cloudSyncConfig();
  if(!config)throw new Error('Configura primero el servicio de sincronización.');
  const headers={
    'apikey':config.anonKey,
    'Content-Type':'application/json'
  };
  if(accessToken)headers.Authorization=`Bearer ${accessToken}`;
  const response=await fetch(`${config.url}${path}`,{
    method:'POST',
    headers,
    body:body==null?undefined:JSON.stringify(body)
  });
  return cloudParseResponse(response);
}
async function cloudRefreshSession(){
  const session=cloudSyncSession();
  if(!session?.refresh_token)return null;
  try{
    const next=await cloudAuthRequest('/auth/v1/token?grant_type=refresh_token',{
      refresh_token:session.refresh_token
    });
    return cloudStoreSession(next);
  }catch(error){
    cloudClearSession();
    throw new Error(`La sesión de sincronización ha caducado: ${error.message}`);
  }
}
async function cloudEnsureSession(){
  const session=cloudSyncSession();
  if(!session)return null;
  const expiresAt=Number(session.expires_at)||0;
  if(expiresAt>Math.floor(Date.now()/1000)+60)return session;
  return cloudRefreshSession();
}
async function cloudRest(path,{method='GET',body=null,prefer=null}={}){
  const config=cloudSyncConfig();
  if(!config)throw new Error('Configura primero el servicio de sincronización.');
  const session=await cloudEnsureSession();
  if(!session)throw new Error('Inicia sesión para sincronizar.');
  const headers={
    'apikey':config.anonKey,
    'Authorization':`Bearer ${session.access_token}`,
    'Content-Type':'application/json'
  };
  if(prefer)headers.Prefer=prefer;
  const response=await fetch(`${config.url}/rest/v1/${path}`,{
    method,headers,body:body==null?undefined:JSON.stringify(body)
  });
  return cloudParseResponse(response);
}
function buildCloudSyncPayload(){
  const recipeImages={};
  const imageKeys=[];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(key?.startsWith('nutriplan_img_'))imageKeys.push(key);
  }
  imageKeys.sort().forEach(key=>recipeImages[key]=localStorage.getItem(key));
  return {
    format:'NutriplanCloudState',
    syncVersion:1,
    dataVersion:window.NUTRIPLAN_DATA?.version||DATA?.version||null,
    state:JSON.parse(JSON.stringify(state)),
    recipeImages
  };
}
function cloudPayloadFingerprint(payload){
  const text=JSON.stringify(payload);
  let hash=2166136261;
  for(let i=0;i<text.length;i++){
    hash^=text.charCodeAt(i);
    hash=Math.imul(hash,16777619);
  }
  return (hash>>>0).toString(16).padStart(8,'0');
}
function cloudLocalHasMeaningfulData(){
  const menus=Object.values(state.menusByDate||{}).some(day=>{
    const normalized=normalizeMenusByPerson(day);
    return ['P01','P02'].some(pid=>Object.values(normalized[pid]||{}).some(Boolean));
  });
  const records=['P01','P02'].some(pid=>Object.keys(state.evolutionRecords?.[pid]||{}).length>0);
  const profileChanged=['P01','P02'].some(pid=>{
    const cur=state.profileSettings?.[pid]||{},def=DEFAULT_PROFILE_SETTINGS[pid];
    return ['name','sex','age','height','weight','activity','deficit','proteinKg','fatKg'].some(field=>{
      const a=cur[field],b=def[field];
      if(typeof a==='number' || typeof b==='number')return Number(a??0)!==Number(b??0);
      return (a??null)!==(b??null);
    });
  });
  const coffees=Object.values(state.coffeesByDate||{}).some(day=>
    Number(day?.P01||0)>0 || Number(day?.P02||0)>0
  );
  const exercise=Object.values(state.exerciseByDate||{}).some(day=>
    Object.values(day||{}).some(item=>Number(item?.kcal||0)>0 || String(item?.type||'').trim())
  );
  const training=Object.values(state.trainingByDate||{}).some(item=>
    item && String(item.type||'').toLowerCase()==='bike'
  );
  const route=Object.values(state.routeNutritionByDate||{}).some(item=>
    Number(item?.durationMin||0)>0 || Number(item?.gels||0)>0 || Number(item?.bottles||0)>0
  );
  const manualWeights=['P01','P02'].some(pid=>
    Object.keys(state.manualWeightOverrides?.[pid]||{}).length>0
  );
  const adjustments=Object.values(state.recipeAdjustments||{}).some(day=>
    day && Object.keys(day).length>0
  );
  const checks=Object.values(state.checks||{}).some(Boolean);
  return menus || records || profileChanged || coffees || exercise || training || route ||
    manualWeights || adjustments || checks ||
    Object.keys(state.recipeEdits||{}).length>0 ||
    Object.keys(state.recipeVariants||{}).length>0;
}
async function cloudFetchRemote(){
  const session=await cloudEnsureSession();
  if(!session)return null;
  const rows=await cloudRest(
    `nutriplan_sync?user_id=eq.${encodeURIComponent(session.user.id)}&select=payload,updated_at&limit=1`
  );
  return Array.isArray(rows)&&rows.length?rows[0]:null;
}
async function cloudUpsertPayload(payload){
  const session=await cloudEnsureSession();
  if(!session)throw new Error('Inicia sesión para sincronizar.');
  const rows=await cloudRest(
    'nutriplan_sync?on_conflict=user_id&select=updated_at',
    {
      method:'POST',
      prefer:'resolution=merge-duplicates,return=representation',
      body:{user_id:session.user.id,payload}
    }
  );
  if(Array.isArray(rows)&&rows[0]?.updated_at)return rows[0].updated_at;
  const remote=await cloudFetchRemote();
  if(!remote?.updated_at)throw new Error('No se pudo confirmar el guardado en la nube.');
  return remote.updated_at;
}
function cloudReplaceRecipeImages(images){
  const remove=[];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(key?.startsWith('nutriplan_img_'))remove.push(key);
  }
  remove.forEach(key=>localStorage.removeItem(key));
  Object.entries(images||{}).forEach(([key,value])=>{
    if(key.startsWith('nutriplan_img_') && typeof value==='string')localStorage.setItem(key,value);
  });
}
function cloudApplyRemote(remote){
  const payload=remote?.payload;
  if(payload?.format!=='NutriplanCloudState' || !payload.state)throw new Error('La copia de la nube no tiene un formato válido.');
  localStorage.setItem('nutriplan_state',JSON.stringify(payload.state));
  cloudReplaceRecipeImages(payload.recipeImages);
  cloudSetMeta({
    initialized:true,
    needsChoice:false,
    conflict:false,
    lastRemoteUpdatedAt:remote.updated_at||null,
    lastSyncedFingerprint:cloudPayloadFingerprint(payload),
    lastSyncAt:new Date().toISOString()
  });
  location.reload();
}
async function cloudPushCurrent(force=false){
  if(cloudSyncBusy)return;
  cloudSyncBusy=true;renderCloudSyncStatus();
  try{
    const session=await cloudEnsureSession();
    if(!session)throw new Error('Inicia sesión para sincronizar.');
    cloudResetMetaForUser(session.user.id);
    if(!force){
      const meta=cloudSyncMeta();
      const remote=await cloudFetchRemote();
      const payload=buildCloudSyncPayload();
      const fingerprint=cloudPayloadFingerprint(payload);
      const localChanged=Boolean(meta.lastSyncedFingerprint && fingerprint!==meta.lastSyncedFingerprint);
      const remoteChanged=Boolean(remote && meta.lastRemoteUpdatedAt && remote.updated_at!==meta.lastRemoteUpdatedAt);
      if(meta.initialized && localChanged && remoteChanged){
        cloudSetMeta({conflict:true,needsChoice:false});
        throw new Error('Hay cambios en este dispositivo y en la nube. Elige qué copia conservar.');
      }
    }
    const payload=buildCloudSyncPayload();
    const updatedAt=await cloudUpsertPayload(payload);
    cloudSetMeta({
      initialized:true,
      needsChoice:false,
      conflict:false,
      lastRemoteUpdatedAt:updatedAt,
      lastSyncedFingerprint:cloudPayloadFingerprint(payload),
      lastSyncAt:new Date().toISOString()
    });
    pwaToast('Datos sincronizados con la nube.');
  }finally{
    cloudSyncBusy=false;renderCloudSyncStatus();
  }
}
async function cloudPullCurrent(force=false){
  if(cloudSyncBusy)return;
  cloudSyncBusy=true;renderCloudSyncStatus();
  try{
    const remote=await cloudFetchRemote();
    if(!remote)throw new Error('Todavía no hay una copia de Nutriplan en la nube.');
    if(!force){
      const meta=cloudSyncMeta();
      const localFingerprint=cloudPayloadFingerprint(buildCloudSyncPayload());
      const localChanged=Boolean(meta.lastSyncedFingerprint && localFingerprint!==meta.lastSyncedFingerprint);
      if(meta.initialized && localChanged){
        cloudSetMeta({conflict:true});
        throw new Error('Hay cambios locales pendientes. Elige qué copia conservar.');
      }
    }
    cloudApplyRemote(remote);
  }finally{
    cloudSyncBusy=false;renderCloudSyncStatus();
  }
}
async function cloudSyncCycle(){
  if(!cloudSyncReady || cloudSyncBusy || !cloudSyncConfig())return;
  const session=await cloudEnsureSession();
  if(!session){renderCloudSyncStatus();return;}
  const meta=cloudResetMetaForUser(session.user.id);
  if(!meta.initialized || meta.needsChoice || meta.conflict){renderCloudSyncStatus();return;}

  cloudSyncBusy=true;renderCloudSyncStatus();
  try{
    const payload=buildCloudSyncPayload();
    const fingerprint=cloudPayloadFingerprint(payload);
    const localChanged=fingerprint!==meta.lastSyncedFingerprint;
    const remote=await cloudFetchRemote();

    if(!remote){
      const updatedAt=await cloudUpsertPayload(payload);
      cloudSetMeta({
        initialized:true,needsChoice:false,conflict:false,
        lastRemoteUpdatedAt:updatedAt,lastSyncedFingerprint:fingerprint,
        lastSyncAt:new Date().toISOString()
      });
      return;
    }

    const remoteChanged=Boolean(meta.lastRemoteUpdatedAt && remote.updated_at!==meta.lastRemoteUpdatedAt);
    if(remoteChanged && localChanged){
      cloudSetMeta({conflict:true,needsChoice:false});
      return;
    }
    if(remoteChanged && !localChanged){
      cloudApplyRemote(remote);
      return;
    }
    if(!remoteChanged && localChanged){
      const updatedAt=await cloudUpsertPayload(payload);
      cloudSetMeta({
        initialized:true,needsChoice:false,conflict:false,
        lastRemoteUpdatedAt:updatedAt,lastSyncedFingerprint:fingerprint,
        lastSyncAt:new Date().toISOString()
      });
      return;
    }
    cloudSetMeta({lastSyncAt:new Date().toISOString()});
  }catch(error){
    console.warn('Sincronización no disponible:',error);
    const badge=document.getElementById('cloudSyncBadge');
    if(badge)badge.textContent=navigator.onLine===false?'Sin conexión':'Error de sincronización';
  }finally{
    cloudSyncBusy=false;renderCloudSyncStatus();
  }
}
async function cloudInitialSync(){
  const session=await cloudEnsureSession();
  if(!session){renderCloudSyncStatus();return;}
  const meta=cloudResetMetaForUser(session.user.id);
  if(meta.initialized){
    await cloudSyncCycle();
    return;
  }
  cloudSyncBusy=true;renderCloudSyncStatus();
  try{
    const remote=await cloudFetchRemote();
    if(!remote){
      const payload=buildCloudSyncPayload();
      const updatedAt=await cloudUpsertPayload(payload);
      cloudSetMeta({
        initialized:true,needsChoice:false,conflict:false,
        lastRemoteUpdatedAt:updatedAt,
        lastSyncedFingerprint:cloudPayloadFingerprint(payload),
        lastSyncAt:new Date().toISOString()
      });
      pwaToast('Primera copia subida. La sincronización ya está activa.');
      return;
    }
    if(!cloudLocalHasMeaningfulData()){
      cloudApplyRemote(remote);
      return;
    }
    cloudSetMeta({needsChoice:true,conflict:false});
    pwaToast('Hay datos locales y datos en la nube. Elige qué copia conservar.',5000);
  }finally{
    cloudSyncBusy=false;renderCloudSyncStatus();
  }
}
function scheduleCloudSync(){
  if(!cloudSyncReady || !cloudSyncConfig() || !cloudSyncSession())return;
  const meta=cloudSyncMeta();
  if(!meta.initialized || meta.needsChoice || meta.conflict)return;
  clearTimeout(cloudSyncTimer);
  cloudSyncTimer=setTimeout(()=>cloudSyncCycle(),1500);
}
async function cloudAuthenticate(mode){
  const config=cloudSyncConfig();
  if(!config){alert('Guarda primero la URL y la clave pública de Supabase.');return;}
  const email=document.getElementById('cloudSyncEmail')?.value.trim();
  const password=document.getElementById('cloudSyncPassword')?.value||'';
  if(!email || !password){alert('Introduce correo y contraseña.');return;}
  cloudSyncBusy=true;renderCloudSyncStatus();
  try{
    const result=mode==='signup'
      ? await cloudAuthRequest('/auth/v1/signup',{email,password})
      : await cloudAuthRequest('/auth/v1/token?grant_type=password',{email,password});
    if(!result?.access_token){
      pwaToast('Cuenta creada. Revisa tu correo si Supabase pide confirmación y después inicia sesión.',7000);
      return;
    }
    cloudStoreSession(result);
    const passwordInput=document.getElementById('cloudSyncPassword');
    if(passwordInput)passwordInput.value='';
    renderCloudSyncStatus();
    await cloudInitialSync();
  }catch(error){
    alert(error.message||'No se pudo iniciar sesión.');
  }finally{
    cloudSyncBusy=false;renderCloudSyncStatus();
  }
}
async function cloudLogout(){
  const session=cloudSyncSession();
  try{
    if(session?.access_token)await cloudAuthRequest('/auth/v1/logout',null,session.access_token);
  }catch(_){}
  cloudClearSession();
  pwaToast('Sesión de sincronización cerrada.');
}
function renderCloudSyncStatus(){
  const config=cloudSyncConfig();
  const session=cloudSyncSession();
  const meta=cloudSyncMeta();
  const badge=document.getElementById('cloudSyncBadge');
  const account=document.getElementById('cloudSyncAccount');
  const last=document.getElementById('cloudSyncLast');
  const auth=document.getElementById('cloudSyncAuth');
  const connected=document.getElementById('cloudSyncConnected');
  const conflict=document.getElementById('cloudSyncConflict');
  const setup=document.getElementById('cloudSyncSetup');
  const url=document.getElementById('cloudSyncUrl');
  const key=document.getElementById('cloudSyncAnonKey');

  if(url && document.activeElement!==url)url.value=config?.url||'';
  if(key && document.activeElement!==key)key.value=config?.anonKey||'';
  if(setup && !config)setup.open=true;
  if(account)account.textContent=session?.user?.email||'—';
  if(last)last.textContent=meta.lastSyncAt?new Date(meta.lastSyncAt).toLocaleString('es-ES'):'—';
  if(auth)auth.hidden=Boolean(session);
  if(connected)connected.hidden=!session;
  if(conflict)conflict.hidden=!(meta.conflict||meta.needsChoice);

  let text='No configurada';
  if(config)text='Sin sesión';
  if(session)text='Conectada';
  if(session && meta.initialized)text='Sincronizada';
  if(session && meta.needsChoice)text='Elegir origen';
  if(session && meta.conflict)text='Conflicto';
  if(cloudSyncBusy)text='Sincronizando…';
  if(badge)badge.textContent=text;
}
function saveCloudSyncConfig(){
  const url=String(document.getElementById('cloudSyncUrl')?.value||'').trim().replace(/\/+$/,'');
  const anonKey=String(document.getElementById('cloudSyncAnonKey')?.value||'').trim();
  if(!url || !anonKey){alert('Introduce la URL y la clave pública del proyecto.');return;}
  if(!/^https:\/\//i.test(url) && !/^http:\/\/(?:localhost|127\.0\.0\.1)/i.test(url)){
    alert('La URL de Supabase debe usar HTTPS.');return;
  }
  if(/service_role/i.test(anonKey) || /^sb_secret_/i.test(anonKey)){
    alert('No uses una service_role/secret key. Introduce únicamente la clave pública publishable o anon.');return;
  }
  const previous=cloudSyncConfig();
  localStorage.setItem(CLOUD_SYNC_CONFIG_KEY,JSON.stringify({url,anonKey}));
  if(previous && (previous.url!==url || previous.anonKey!==anonKey)){
    localStorage.removeItem(CLOUD_SYNC_SESSION_KEY);
    localStorage.removeItem(CLOUD_SYNC_META_KEY);
  }
  renderCloudSyncStatus();
  pwaToast('Configuración de sincronización guardada.');
}
function clearCloudSyncConfig(){
  if(!confirm('¿Cerrar la sesión y restaurar la configuración predeterminada de sincronización en este dispositivo? Los datos de la nube no se eliminarán.'))return;
  localStorage.removeItem(CLOUD_SYNC_CONFIG_KEY);
  localStorage.removeItem(CLOUD_SYNC_SESSION_KEY);
  localStorage.removeItem(CLOUD_SYNC_META_KEY);
  renderCloudSyncStatus();
}
function initCloudSync(){
  cloudSyncReady=true;
  renderCloudSyncStatus();

  document.getElementById('cloudSyncSaveConfig')?.addEventListener('click',saveCloudSyncConfig);
  document.getElementById('cloudSyncClearConfig')?.addEventListener('click',clearCloudSyncConfig);
  document.getElementById('cloudSyncLogin')?.addEventListener('click',()=>cloudAuthenticate('login'));
  document.getElementById('cloudSyncSignup')?.addEventListener('click',()=>cloudAuthenticate('signup'));
  document.getElementById('cloudSyncLogout')?.addEventListener('click',cloudLogout);
  document.getElementById('cloudSyncNow')?.addEventListener('click',()=>cloudSyncCycle());
  document.getElementById('cloudSyncPush')?.addEventListener('click',()=>{
    if(confirm('¿Usar la copia de este dispositivo como copia principal y sobrescribir la nube?'))cloudPushCurrent(true).catch(error=>alert(error.message));
  });
  document.getElementById('cloudSyncPull')?.addEventListener('click',()=>{
    if(confirm('¿Descargar la copia de la nube y sustituir los datos locales de este dispositivo?'))cloudPullCurrent(true).catch(error=>alert(error.message));
  });

  window.addEventListener('online',()=>cloudSyncCycle());
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible')cloudSyncCycle();
  });
  clearInterval(cloudSyncPoll);
  cloudSyncPoll=setInterval(()=>cloudSyncCycle(),30000);

  if(cloudSyncConfig() && cloudSyncSession()){
    cloudInitialSync().catch(error=>{
      console.warn('No se pudo iniciar la sincronización:',error);
      renderCloudSyncStatus();
    });
  }
}

initCloudSync();
