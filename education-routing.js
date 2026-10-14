/* SUO Accessibility & Travel Time — Fasa 1, OSRM road-driving prototype.
   Public demo endpoint: testing only; never insert API keys in frontend. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const map=window.educationAnalysisMap;
const layer=L.layerGroup().addTo(map);
const BASE='https://router.project-osrm.org';
let start=null,destinationKey='',busy=false,controller=null,sequence=0,lastRequest=0,active=false;
const siteKey=r=>[r.name,r.district,r.lat,r.lon].join('|');
const valid=r=>Number.isFinite(r.lat)&&Number.isFinite(r.lon)&&r.lat>2&&r.lat<4.5&&r.lon>100&&r.lon<103;
const schools=()=>((window.getEducationFilteredSchools?.()||[]).filter(valid));
const fmt=n=>Number(n).toLocaleString('ms-MY',{maximumFractionDigits:2});
const distance=(a,b)=>{const t=Math.PI/180,p1=a.lat*t,p2=b.lat*t,d1=(b.lat-a.lat)*t,d2=(b.lon-a.lon)*t,q=Math.sin(d1/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(d2/2)**2;return 12742.0176*Math.atan2(Math.sqrt(q),Math.sqrt(Math.max(0,1-q)))};
function message(s){$('routingMessage').textContent=s}
function disable(b){busy=b;$('routingCalculate').disabled=b;$('routingCalculate').textContent=b?'Sedang mendapatkan laluan…':'Kira laluan memandu'}
function clearGraphics(){layer.clearLayers();$('routingResults').innerHTML='';}
function renderStart(){
 if(!start)return;
 L.circleMarker([start.lat,start.lon],{radius:9,color:'#fff',weight:3,fillColor:'#dd5834',fillOpacity:1}).bindPopup('Lokasi asal').addTo(layer);
}
function refreshSchools(){
 const rows=schools().slice().sort((a,b)=>a.name.localeCompare(b.name,'ms'));
 const select=$('routingSchool');const prior=destinationKey||select.value;
 select.innerHTML='<option value="">Pilih destinasi sekolah ('+rows.length+')</option>'+rows.map(r=>'<option value="'+esc(siteKey(r))+'">'+esc(r.name)+' — '+esc(r.district)+'</option>').join('');
 select.value=rows.some(r=>siteKey(r)===prior)?prior:'';
 destinationKey=select.value;
 $('routingCount').textContent=rows.length.toLocaleString('ms-MY');
 return rows;
}
function chooseNearestStraight(){
 if(!start){message('Klik lokasi asal pada peta dahulu.');return}
 const near=schools().slice().sort((a,b)=>distance(start,a)-distance(start,b))[0];
 if(!near){message('Tiada sekolah berkoordinat yang memenuhi penapis.');return}
 destinationKey=siteKey(near);$('routingSchool').value=destinationKey;
 message('Sekolah paling dekat mengikut garis lurus dipilih. Klik “Kira laluan memandu” untuk jarak dan masa melalui jalan raya.');
}
function setOrigin(latlon){
 if(!active)return;
 if(!Number.isFinite(latlon.lat)||!Number.isFinite(latlon.lng))return;
 start={lat:latlon.lat,lon:latlon.lng};cancel();clearGraphics();renderStart();
 message('Lokasi asal ditetapkan: '+start.lat.toFixed(5)+', '+start.lon.toFixed(5)+'. Pilih sekolah dan kira laluan.');
}
function selectSchool(r){
 if(!active)return;
 const rows=refreshSchools();const candidate=rows.find(s=>siteKey(s)===siteKey(r));
 if(!candidate)return;
 destinationKey=siteKey(candidate);$('routingSchool').value=destinationKey;
 cancel();clearGraphics();renderStart();message('Destinasi '+candidate.name+' dipilih. Klik “Kira laluan memandu”.');
}
function cancel(){sequence++;if(controller){controller.abort();controller=null}disable(false)}
async function calculate(){
 if(busy)return;
 const src=start,school=schools().find(r=>siteKey(r)===destinationKey);
 if(!src){message('Klik lokasi asal pada peta dahulu.');return}
 if(!school){message('Pilih sekolah destinasi daripada senarai dahulu.');return}
 const now=Date.now();
 if(now-lastRequest<1250){message('Sila tunggu sebentar sebelum permintaan laluan seterusnya (had pelayan demonstrasi).');return}
 lastRequest=now;cancel();const id=sequence;controller=new AbortController();
 const timer=setTimeout(()=>controller?.abort(),16000);
 disable(true);clearGraphics();renderStart();message('Menghubungi enjin routing OSRM melalui rangkaian jalan…');
 try{
  const coordinateString=src.lon+','+src.lat+';'+school.lon+','+school.lat;
  const url=BASE+'/route/v1/driving/'+coordinateString+'?overview=full&geometries=geojson&steps=false&alternatives=false';
  const res=await fetch(url,{signal:controller.signal,headers:{Accept:'application/json'}});
  if(!res.ok)throw Error('Pelayan routing memberi HTTP '+res.status);
  const json=await res.json();
  if(json.code!=='Ok'||!json.routes?.length||json.routes[0].geometry?.type!=='LineString')throw Error('Tiada laluan jalan ditemui untuk dua lokasi ini');
  if(!active||id!==sequence)return;
  const route=json.routes[0];if(!Number.isFinite(route.distance)||!Number.isFinite(route.duration))throw Error('Respons jarak/masa tidak sah');
  const trace=L.geoJSON(route.geometry,{style:{color:'#d96a36',weight:6,opacity:.94,lineCap:'round',lineJoin:'round'}}).addTo(layer);
  L.circleMarker([school.lat,school.lon],{radius:9,color:'#fff',weight:3,fillColor:'#1f8b83',fillOpacity:1}).bindPopup('<b>'+esc(school.name)+'</b>').addTo(layer);
  const snapped=json.waypoints||[];
  const offsets=snapped.map(p=>p?.distance).filter(Number.isFinite);
  const maxOffset=Math.max(0,...offsets);
  const km=route.distance/1000;const min=route.duration/60;
  $('routingResults').innerHTML='<div class="route-result-metric"><small>ANGGARAN MASA MEMANDU</small><strong>'+fmt(min)+' minit</strong></div><div class="route-result-metric"><small>JARAK MELALUI JALAN</small><strong>'+fmt(km)+' km</strong></div><div class="analysis-result"><strong>'+esc(school.name)+'</strong><span>'+esc(school.category||school.type)+' · '+esc(school.district)+'</span><span>Anggaran tanpa trafik langsung / waktu puncak</span></div>'+(maxOffset>100?'<p class="analysis-caveat">Amaran: titik sekolah/lokasi asal berada sehingga '+Math.round(maxOffset)+' m daripada jalan yang dijumpai oleh enjin. Semak jalan masuk sebenar.</p>':'');
  message('Laluan memandu dijana daripada rangkaian jalan. Masa perjalanan ialah anggaran profil OSRM, bukan masa perjalanan langsung.');
  const bounds=trace.getBounds();if(bounds.isValid())map.fitBounds(bounds.pad(.18),{maxZoom:15,animate:false});
 }catch(e){
  if(id!==sequence)return;
  message(e.name==='AbortError'?'Permintaan tamat masa atau dibatalkan. Cuba semula.':'Gagal mendapatkan laluan: '+e.message+'. Cuba destinasi atau lokasi berhampiran jalan lain.');
  clearGraphics();renderStart();
 }finally{clearTimeout(timer);if(id===sequence){controller=null;disable(false)}}
}
function activate(){
 active=true;refreshSchools();clearGraphics();renderStart();
 if(!start)message('Klik mana-mana lokasi dalam peta tengah sebagai lokasi asal, kemudian pilih sekolah destinasi.');
 else message('Lokasi asal dikekalkan. Pilih sekolah dan kira laluan memandu.');
}
function deactivate(){active=false;cancel();clearGraphics()}
function reset(){cancel();start=null;destinationKey='';$('routingSchool').value='';clearGraphics();message('Klik lokasi pada peta untuk menetapkan lokasi asal.')}
$('routingSchool').addEventListener('change',e=>{destinationKey=e.target.value;cancel();clearGraphics();renderStart()});
$('routingNearest').addEventListener('click',chooseNearestStraight);
$('routingCalculate').addEventListener('click',calculate);
$('routingReset').addEventListener('click',reset);
window.educationRouting={activate,deactivate,refresh:()=>{refreshSchools();if(active){cancel();clearGraphics();renderStart();message('Penapis sekolah dikemas kini. Kira semula laluan untuk destinasi yang dipilih.')}},setOrigin,selectSchool,hasOrigin:()=>!!start};
})();