const leads = [
 {id:1,name:"Camila Benítez",email:"camila.benitez@mail.com",phone:"0981 234 567",interest:"Departamento en Asunción",source:"tucasa.click",status:"Nuevo",advisor:"María Rojas",advisorType:"Interno",initials:"CB",color:"blue",message:"Consulta por disponibilidad y precio."},
 {id:2,name:"Diego Acosta",email:"diego.acosta@mail.com",phone:"0982 345 678",interest:"Casa en Luque",source:"WhatsApp",status:"En seguimiento",advisor:"Juan Pérez",advisorType:"Externo",initials:"DA",color:"orange",message:"Quiere coordinar una visita."},
 {id:3,name:"Lucía Vera",email:"lucia.vera@mail.com",phone:"0983 456 789",interest:"Terreno en San Lorenzo",source:"tucasa.click",status:"Calificado",advisor:"Lucía Sánchez",advisorType:"Interno",initials:"LV",color:"purple",message:"Consulta sobre financiación."},
 {id:4,name:"Mateo Giménez",email:"mateo.gimenez@mail.com",phone:"0984 567 890",interest:"Dúplex en Fernando de la Mora",source:"Referido",status:"En seguimiento",advisor:"María Rojas",advisorType:"Interno",initials:"MG",color:"green",message:"Solicita información de la zona."},
 {id:5,name:"Sofía Duarte",email:"sofia.duarte@mail.com",phone:"0985 678 901",interest:"Departamento en Villa Morra",source:"tucasa.click",status:"Nuevo",advisor:"Sin asignar",advisorType:"",initials:"SD",color:"pink",message:"Preguntó por expensas y cochera."},
 {id:6,name:"Bruno Ferreira",email:"bruno.ferreira@mail.com",phone:"0986 789 012",interest:"Casa en Mariano Roque Alonso",source:"Otro",status:"Cerrado",advisor:"Juan Pérez",advisorType:"Externo",initials:"BF",color:"blue",message:"Consulta de demostración."}
];
const activities = [
 {day:"13",month:"OCT",time:"09:30",title:"Llamar a Camila Benítez",detail:"Confirmar disponibilidad del departamento",type:"Llamada"},
 {day:"13",month:"OCT",time:"11:00",title:"Visita con Diego Acosta",detail:"Casa en Luque · Coordinar ubicación",type:"Visita"},
 {day:"14",month:"OCT",time:"10:15",title:"Seguimiento a Lucía Vera",detail:"Enviar información del terreno",type:"Seguimiento"},
 {day:"15",month:"OCT",time:"15:00",title:"Revisar nueva consulta",detail:"Asignar asesor al lead recibido",type:"Tarea"}
];
const $ = id => document.getElementById(id);
const statusClass = s => ({'Nuevo':'status-blue','En seguimiento':'status-orange','Calificado':'status-violet','Cerrado':'status-green'})[s] || 'status-gray';
const avatarClass = c => ({blue:'avatar-blue',orange:'avatar-orange',purple:'avatar-purple',green:'avatar-green',pink:'avatar-pink'})[c] || 'avatar-blue';
function contactCell(l){return `<div class="contact-cell"><div class="mini-avatar ${avatarClass(l.color)}">${l.initials}</div><div><div class="contact-name">${escapeHtml(l.name)}</div><div class="contact-email">${escapeHtml(l.email||'Sin email')}</div></div></div>`}
function statusPill(s){return `<span class="status ${statusClass(s)}">${escapeHtml(s)}</span>`}
function advisorCell(l){return `<div class="advisor-cell"><div class="mini-avatar ${l.advisorType==='Externo'?'avatar-orange':'avatar-green'}">${l.advisor==='Sin asignar'?'—':l.advisor.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><span>${escapeHtml(l.advisor)}</span></div>`}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderDashboard(){
 const q=($('dashboardSearch')?.value||'').toLowerCase(), status=$('dashboardStatus')?.value||'all';
 const filtered=leads.filter(l=>(l.name+' '+l.interest+' '+l.email).toLowerCase().includes(q)&&(status==='all'||l.status===status)).slice(0,4);
 $('dashboardLeadRows').innerHTML=filtered.map(l=>`<tr><td>${contactCell(l)}</td><td>${escapeHtml(l.interest)}</td><td>${statusPill(l.status)}</td><td>${advisorCell(l)}</td></tr>`).join('')||'<tr><td colspan="4">No se encontraron leads.</td></tr>';
 $('dashboardCount').textContent=`Mostrando ${filtered.length} de ${leads.length} registros de ejemplo`;
 $('navLeadCount').textContent=leads.length;
 $('statLeads').textContent=128+Math.max(0,leads.length-6);
}
function renderAllLeads(){
 const q=($('leadSearch')?.value||'').toLowerCase(), status=$('leadStatusFilter')?.value||'all';
 const filtered=leads.filter(l=>(l.name+' '+l.interest+' '+l.email+' '+l.source).toLowerCase().includes(q)&&(status==='all'||l.status===status));
 $('allLeadRows').innerHTML=filtered.map(l=>`<tr><td>${contactCell(l)}<div class="contact-email" style="margin-left:39px">${escapeHtml(l.phone||'Sin teléfono')}</div></td><td>${escapeHtml(l.interest)}</td><td>${escapeHtml(l.source)}</td><td>${advisorCell(l)}</td><td><select class="inline-status" data-id="${l.id}" aria-label="Estado de ${escapeHtml(l.name)}">${['Nuevo','En seguimiento','Calificado','Cerrado'].map(s=>`<option ${s===l.status?'selected':''}>${s}</option>`).join('')}</select></td><td><button class="text-btn view-lead" data-id="${l.id}">Ver detalle</button></td></tr>`).join('')||'<tr><td colspan="6">No se encontraron leads.</td></tr>';
}
function renderActivities(){
 const html=activities.map(a=>`<div class="activity-item"><div class="activity-date"><strong>${a.day}</strong><span>${a.month}</span></div><div class="activity-copy"><strong>${escapeHtml(a.title)}</strong><p>${escapeHtml(a.detail)}</p></div><div class="activity-time">${a.time}</div></div>`).join('');
 $('activityList').innerHTML=activities.slice(0,3).map(a=>`<div class="activity-item"><div class="activity-date"><strong>${a.day}</strong><span>${a.month}</span></div><div class="activity-copy"><strong>${escapeHtml(a.title)}</strong><p>${escapeHtml(a.detail)}</p></div><div class="activity-time">${a.time}</div></div>`).join('');
 $('allActivities').innerHTML=html;
}
const viewNames={dashboard:['Panel general','Buenos días, equipo 👋','Este es el resumen de lo que está pasando con tus clientes hoy.'],leads:['Leads','Gestión de leads','Consultas recibidas y seguimiento comercial.'],opportunities:['Oportunidades','Oportunidades comerciales','Seguimiento de posibles operaciones inmobiliarias.'],activities:['Actividades','Agenda de actividades','Llamadas, visitas y tareas de seguimiento.'],advisors:['Asesores','Equipo de asesores','Asesores internos y colaboradores externos.']};
function goTo(view){
 document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
 ['dashboard','leads','opportunities','activities','advisors'].forEach(v=>$(v+'View').classList.toggle('hidden',v!==view));
 $('breadcrumbTitle').textContent=viewNames[view][0];$('pageTitle').textContent=viewNames[view][1];$('pageSubtitle').textContent=viewNames[view][2];
 $('newLeadBtn').classList.toggle('hidden',view!=='dashboard'&&view!=='leads');
 if(view==='leads')renderAllLeads();
 $('sidebar').classList.remove('open');
}
function showToast(message){const t=$('toast');t.textContent=message;t.classList.remove('hidden');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.add('hidden'),3200)}
function openModal(){$('leadModal').classList.remove('hidden');$('leadForm').elements.name.focus()}
function closeModal(){$('leadModal').classList.add('hidden')}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>goTo(b.dataset.view)));
document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>goTo(b.dataset.goto)));
$('newLeadBtn').addEventListener('click',openModal);$('newLeadBtn2').addEventListener('click',openModal);
$('closeModal').addEventListener('click',closeModal);$('cancelModal').addEventListener('click',closeModal);
$('mobileMenu').addEventListener('click',()=>$('sidebar').classList.toggle('open'));
$('dashboardSearch').addEventListener('input',renderDashboard);$('dashboardStatus').addEventListener('change',renderDashboard);
$('leadSearch').addEventListener('input',renderAllLeads);$('leadStatusFilter').addEventListener('change',renderAllLeads);
$('leadForm').addEventListener('submit',e=>{
 e.preventDefault();const f=new FormData(e.currentTarget);const name=f.get('name').trim();const interest=f.get('interest').trim();
 const initials=name.split(/\s+/).slice(0,2).map(s=>s[0]?.toUpperCase()||'').join('');
 leads.unshift({id:Date.now(),name,email:f.get('email')||'',phone:f.get('phone')||'',interest,source:f.get('source'),status:f.get('status'),advisor:'Sin asignar',advisorType:'',initials,color:'purple',message:f.get('message')||''});
 renderDashboard();renderAllLeads();closeModal();e.currentTarget.reset();goTo('leads');showToast('Lead agregado al prototipo. Todavía no se guardó en SQL.');
});
document.addEventListener('change',e=>{
 if(e.target.matches('.inline-status')){const l=leads.find(x=>String(x.id)===e.target.dataset.id);if(l){l.status=e.target.value;renderDashboard();renderAllLeads();showToast('Estado actualizado en memoria de demostración.');}}
});
document.addEventListener('click',e=>{const b=e.target.closest('.view-lead');if(!b)return;const l=leads.find(x=>String(x.id)===b.dataset.id);if(l)showToast(`${l.name} · ${l.phone||'Sin teléfono'} · ${l.message||'Sin mensaje'}`)});
$('leadModal').addEventListener('click',e=>{if(e.target===$('leadModal'))closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
const date=new Date();$('todayLabel').textContent=date.toLocaleDateString('es-PY',{weekday:'long',day:'numeric',month:'long'}).toUpperCase();
renderDashboard();renderAllLeads();renderActivities();
