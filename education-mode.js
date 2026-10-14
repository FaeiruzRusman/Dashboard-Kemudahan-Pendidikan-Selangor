/* Single workspace tab controller: Overview / Coverage / Nearest */
(()=>{
'use strict';
const modes=['overview','coverage','nearest'];
const el=id=>document.getElementById(id);
let current='overview';
function show(mode){
 if(!modes.includes(mode))return;
 current=mode;
 document.querySelectorAll('[data-dashboard-mode]').forEach(button=>{
  const active=button.dataset.dashboardMode===mode;
  button.classList.toggle('active',active);
  button.setAttribute('aria-pressed',String(active));
 });
 const overview=mode==='overview';
 el('overviewControls').hidden=!overview;
 el('coverageControls').hidden=mode!=='coverage';
 el('nearestControls').hidden=mode!=='nearest';
 el('analysisCommon').hidden=overview;
 el('analitik').hidden=!overview;
 el('analysisOutput').hidden=overview;
 el('map').hidden=!overview;
 el('analysisMap').hidden=overview;
 if(overview){
  requestAnimationFrame(()=>{if(typeof map!=='undefined')map.invalidateSize({pan:false})});
 }else{
  el('analysisResultTitle').textContent=mode==='coverage'?'Ringkasan Coverage':'Keputusan Nearest School';
  if(typeof window.setEducationAnalysisMode==='function')window.setEducationAnalysisMode(mode);
  requestAnimationFrame(()=>{
   if(window.educationAnalysisMap)window.educationAnalysisMap.invalidateSize({pan:false});
   if(typeof window.updateEducationAnalysis==='function')window.updateEducationAnalysis();
  });
 }
}
document.querySelectorAll('[data-dashboard-mode]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.dashboardMode)));
window.showEducationMode=show;
show('overview');
})();