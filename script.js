function filterNov(btn){
  var filter = btn.getAttribute('data-filter');
  // Actualizar botón activo
  document.querySelectorAll('.filter-row .ftab').forEach(function(b){ b.classList.remove('on'); });
  btn.classList.add('on');
  // Mostrar/ocultar productos
  document.querySelectorAll('#nov-grid .prod-card').forEach(function(card){
    if(filter === 'todos' || card.getAttribute('data-cat') === filter){
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterCat(gridId, type, val, btn){
  var grid = document.getElementById(gridId);
  if(!grid) return;
  // Actualizar botón activo dentro de su grupo
  var group = btn.closest('.cat-filter-group');
  group.querySelectorAll('.ftab').forEach(function(b){ b.classList.remove('on'); });
  btn.classList.add('on');
  // Guardar filtros activos en el grid
  if(type === 'brand') grid.dataset.activeBrand = val;
  if(type === 'price') grid.dataset.activePrice = val;
  var activeBrand = grid.dataset.activeBrand || 'todos';
  var activePrice = grid.dataset.activePrice || 'todos';
  // Filtrar cards
  var visible = 0;
  grid.querySelectorAll('.prod-card').forEach(function(card){
    var brandOk = activeBrand === 'todos' || card.dataset.brand === activeBrand;
    var priceOk  = activePrice  === 'todos' || card.dataset.price  === activePrice;
    var show = brandOk && priceOk;
    card.style.display = show ? '' : 'none';
    if(show) visible++;
  });
  // Mostrar/ocultar estado vacío
  var empty = grid.querySelector('.cat-empty');
  if(empty) empty.style.display = visible === 0 ? 'block' : 'none';
}

window.addEventListener('scroll',()=>{document.getElementById('hdr').classList.toggle('scrolled',window.scrollY>40)});
function openMob(){document.getElementById('mobMenu').classList.add('open');document.body.style.overflow='hidden'}
function closeMob(){document.getElementById('mobMenu').classList.remove('open');document.body.style.overflow=''}
// show hamburger on mobile
function checkW(){
  var btn=document.getElementById('mobBtn');
  if(btn) btn.style.display=window.innerWidth<=860?'flex':'none';
}
checkW();
window.addEventListener('resize',checkW);

// Reveal on scroll
function initReveal(){
  var els=document.querySelectorAll('.rv');
  if(!els.length) return;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('revealed');e.target.classList.add('on');io.unobserve(e.target);}
    });
  },{threshold:0.12});
  els.forEach(function(el){io.observe(el);});
}
initReveal();
document.addEventListener('DOMContentLoaded', function(){ initReveal(); });
