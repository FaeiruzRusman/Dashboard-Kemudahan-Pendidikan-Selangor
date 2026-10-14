/* SUO Education spatial analysis: client-side, geodesic distance, indicative buffers */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const radiusOptions=[500,1000,3000,5000];
const geomLayer=L.layerGroup(),pointLayer=L.layerGroup(),selectionLayer=L.layerGroup();
const analysisMap=L.map('analysisMap',{zoomControl:true,preferCanvas:true}).setView([3.18,101.55],9);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(analysisMap);
geomLayer.addTo(analysisMap);pointLayer.addTo(analysisMap);selectionLayer.addTo(analysisMap);
let activeMode='coverage',chosenKey='',origin=null;
const kmLabel=m=>m<1000?m+' m':(m/1000)+' km';
const fmtKm=km=>km.toLocaleString('ms-MY',{maximumFractionDigits:2,minimumFractionDigits:2});
const valid=r=>r&&Number.isFinite(r.lat)&&Number.isFinite(r.lon)&&r.lat>=2&&r.lat<=4.5&&r.lon>=100&&r.lon<=103;
const siteKey=r=>[r.name,r.district,r.lat,r.lon].join('|');
function relevant(){return (typeof filtered!=='undefined'?filtered:[]).filter(valid)}
function distanceKm(a,b){const rad=Math.PI/180,lat1=a.lat*rad,lat2=b.lat*rad,dlat=(b.lat-a.lat)*rad,dlon=(b.lon-a.lon)*rad,sa=Math.sin(dlat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dlon/2)**2;return 6371.0088*2*Math.atan2(Math.sqrt(sa),Math.sqrt(Math.max(0,1-sa)))}
function msg(s){$('analysisMessage').textContent=s}
function fillSchoolDropdown(){
 const select=$('coverageSchool');const previous=select.value||chosenKey;const rows=relevant().slice().sort((a,b)=>a.name.localeCompare(b.name,'ms'));
 select.innerHTML='<option value="">Semua sekolah bertitik ('+rows.length+')</option>'+rows.map(r=>'<option value="'+esc(siteKey(r))+'">'+esc(r.name)+' — '+esc(r.district)+'</option>').join('');
 select.value=rows.some(r=>siteKey(r)===previous)?previous:'';chosenKey=select.value;
}
function drawPoints(){
 pointLayer.clearLayers();
 const sites=relevant();
 for(const r of sites){
  const marker=L.circleMarker([r.lat,r.lon],{radius:4,weight:1,color:'#fff',fillColor:colors[r.type]||'#8b6c68',fillOpacity:.9});
  marker.bindTooltip(esc(r.name),{direction:'top'});
  marker.on('click',e=>{
   L.DomEvent.stopPropagation(e);
   if(activeMode==='coverage'){
    chosenKey=siteKey(r);$('coverageSchool').value=chosenKey;renderCoverage();
   }else{
    origin={lat:r.lat,lon:r.lon};renderNearest();
   }
  });
  marker.addTo(pointLayer);
 }
 $('analysisValid').textContent=sites.length.toLocaleString('ms-MY');
 $('analysisExcluded').textContent=(typeof filtered!=='undefined'?filtered.length-sites.length:0).toLocaleString('ms-MY');
}
function highlightSchool(r,color='#dc6938'){
 L.circleMarker([r.lat,r.lon],{radius:9,color:'#fff',weight:3,fillColor:color,fillOpacity:1}).bindPopup('<strong>'+esc(r.name)+'</strong><div>'+esc(r.category||r.type)+' · '+esc(r.district)+'</div>').addTo(selectionLayer);
}
function renderCoverage(){
 if(activeMode!=='coverage')return;
 selectionLayer.clearLayers();geomLayer.clearLayers();
 const radius=Number($('coverageRadius').value)||1000;
 const sites=relevant();const selected=sites.find(r=>siteKey(r)===chosenKey);
 const targets=selected?[selected]:sites;
 if(!targets.length){msg('Tiada sekolah berkoordinat yang sepadan dengan penapis semasa.');$('analysisResults').innerHTML='';return}
 const circles=[];
 for(const r of targets){
  circles.push(L.circle([r.lat,r.lon],{radius,color:'#d96b37',weight:selected?2:1,opacity:selected?.95:.4,fillColor:'#f2a24e',fillOpacity:selected?.15:.055}).addTo(geomLayer));
 }
 if(selected){highlightSchool(selected);analysisMap.setView([selected.lat,selected.lon],radius<=1000?13:11);$('analysisResults').innerHTML='<div class="analysis-result"><strong>'+esc(selected.name)+'</strong><span>'+esc(selected.category||selected.type)+' · '+esc(selected.district)+'</span><span>Radius buffer: '+kmLabel(radius)+'</span></div>'}
 else{$('analysisResults').innerHTML='<div class="analysis-result"><strong>'+targets.length.toLocaleString('ms-MY')+' lokasi sekolah</strong><span>Buffer individu '+kmLabel(radius)+' dipaparkan. Kawasan bertindih tidak digabung atau dianggap sebagai bilangan penduduk diliputi.</span></div>'}
 msg('Buffer garis lurus '+kmLabel(radius)+' · '+targets.length+' sekolah ditunjukkan. Ini BUKAN liputan rangkaian jalan atau masa perjalanan.');
}
function renderNearest(){
 if(activeMode!=='nearest')return;
 selectionLayer.clearLayers();geomLayer.clearLayers();$('analysisResults').innerHTML='';
 if(!origin){msg('Klik mana-mana lokasi di peta analisis untuk mencari lima sekolah paling hampir.');return}
 const sites=relevant();if(!sites.length){msg('Tiada sekolah berkoordinat dalam penapis semasa.');return}
 const ranked=sites.map(r=>({school:r,distance:distanceKm(origin,r)})).sort((a,b)=>a.distance-b.distance).slice(0,5);
 L.circleMarker([origin.lat,origin.lon],{radius:9,color:'#fff',weight:3,fillColor:'#d64a37',fillOpacity:1}).bindPopup('Lokasi rujukan').addTo(selectionLayer);
 ranked.forEach(({school:r,distance},i)=>{
  const line=L.polyline([[origin.lat,origin.lon],[r.lat,r.lon]],{color:'#da713b',weight:2,opacity:.65,dashArray:'6,6'}).addTo(geomLayer);
  line.bindTooltip((i+1)+'. '+esc(r.name)+' · '+fmtKm(distance)+' km');
  L.circleMarker([r.lat,r.lon],{radius:7,color:'#fff',weight:2,fillColor:'#278b90',fillOpacity:.95}).bindPopup('<strong>'+esc(r.name)+'</strong><br>'+fmtKm(distance)+' km garis lurus').addTo(selectionLayer);
 });
 $('analysisResults').innerHTML=ranked.map(({school:r,distance},i)=>'<button type="button" class="analysis-result analysis-pick" data-index="'+i+'"><strong>'+(i+1)+'. '+esc(r.name)+'</strong><span>'+esc(r.category||r.type)+' · '+esc(r.district)+'</span><b>'+fmtKm(distance)+' km</b></button>').join('');
 $('analysisResults').querySelectorAll('[data-index]').forEach(el=>el.addEventListener('click',()=>{const r=ranked[Number(el.dataset.index)].school;analysisMap.setView([r.lat,r.lon],13);}));
 msg('5 sekolah terdekat daripada '+sites.length+' lokasi yang berkoordinat. Jarak geodesik (garis lurus), bukan jarak memandu.');
 const bounds=L.latLngBounds([[origin.lat,origin.lon],...ranked.map(x=>[x.school.lat,x.school.lon])]);if(bounds.isValid())analysisMap.fitBounds(bounds.pad(.18),{maxZoom:13});
}
function render(){drawPoints();fillSchoolDropdown();if(activeMode==='coverage'){renderCoverage()}else{renderNearest()}}
function switchMode(mode){
 activeMode=mode;
 document.querySelectorAll('[data-analysis-mode]').forEach(btn=>{const on=btn.dataset.analysisMode===mode;btn.classList.toggle('active',on);btn.setAttribute('aria-pressed',String(on))});
 $('coverageControls').hidden=mode!=='coverage';$('nearestControls').hidden=mode!=='nearest';
 $('analysisResults').innerHTML='';geomLayer.clearLayers();selectionLayer.clearLayers();
 $('analysisMap').classList.toggle('nearest-cursor',mode==='nearest');
 if(mode==='coverage')renderCoverage();else renderNearest();
 setTimeout(()=>analysisMap.invalidateSize(),50);
}
analysisMap.on('click',e=>{if(activeMode==='nearest'){origin={lat:e.latlng.lat,lon:e.latlng.lng};renderNearest()}});
$('coverageSchool').addEventListener('change',e=>{chosenKey=e.target.value;renderCoverage()});
$('coverageRadius').addEventListener('change',renderCoverage);
$('clearAnalysis').addEventListener('click',()=>{origin=null;chosenKey='';$('coverageSchool').value='';selectionLayer.clearLayers();geomLayer.clearLayers();$('analysisResults').innerHTML='';if(activeMode==='coverage')renderCoverage();else renderNearest()});
document.querySelectorAll('[data-analysis-mode]').forEach(btn=>btn.addEventListener('click',()=>switchMode(btn.dataset.analysisMode)));
window.updateEducationAnalysis=()=>{render()};window.setEducationAnalysisMode=switchMode;window.educationAnalysisMap=analysisMap;
render();switchMode('coverage');
})();