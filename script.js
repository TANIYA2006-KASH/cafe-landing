const $ = id => document.getElementById(id);
const ITEMS = [
  ['Masala Chai', 'Ginger, cardamom, strong tea.', 30, 'drinks', '☕'],
  ['Cold Coffee', 'Chilled, creamy, lightly sweet.', 80, 'drinks', '🥤'],
  ['Lemon Iced Tea', 'Fresh lemon over ice.', 60, 'drinks', '🍋'],
  ['Veg Sandwich', 'Grilled with cheese and chutney.', 70, 'food', '🥪'],
  ['Samosa Plate', 'Two crispy pieces, mint chutney.', 30, 'food', '🥟'],
  ['Maggi Masala', 'Spicy, buttery and comforting.', 50, 'food', '🍜'],
  ['Choco Brownie', 'Warm, fudgy, with a dusting of cocoa.', 90, 'sweet', '🍫'],
  ['Gulab Jamun', 'Two soft pieces in rose syrup.', 60, 'sweet', '🍩'],
  ['Kulhad Kheer', 'Slow-cooked rice pudding.', 70, 'sweet', '🍮']
];
function drawMenu(cat) {
  $('items').innerHTML = ITEMS.filter(i => cat === 'all' || i[3] === cat).map(i =>
    `<article class="item"><span class="e" aria-hidden="true">${i[4]}</span><div><h3>${i[0]}</h3><p>${i[1]}</p></div><b>Rs. ${i[2]}</b></article>`).join('');
}
document.querySelectorAll('.tab').forEach(b => b.onclick = () => {
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('on'));
  b.classList.add('on'); drawMenu(b.dataset.c);
});
drawMenu('all');

// Mobile nav
$('burger').onclick = () => {
  const open = $('links').classList.toggle('open');
  $('burger').setAttribute('aria-expanded', open);
};
$('links').querySelectorAll('a').forEach(a => a.onclick = () => $('links').classList.remove('open'));

// Scroll reveal
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 }) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// Reservation form with validation
$('d').min = new Date().toISOString().split('T')[0];
function fail(inp, msg) { inp.classList.add('bad'); inp.nextElementSibling.textContent = msg; return false; }
function pass(inp) { inp.classList.remove('bad'); inp.nextElementSibling.textContent = ''; return true; }
$('rsv').addEventListener('submit', e => {
  e.preventDefault();
  const ok = [
    $('n').value.trim().length >= 2 ? pass($('n')) : fail($('n'), 'Please enter your name.'),
    /^[6-9]\d{9}$/.test($('p').value.replace(/\s/g, '')) ? pass($('p')) : fail($('p'), 'Enter a valid 10-digit mobile number.'),
    $('d').value && $('d').value >= $('d').min ? pass($('d')) : fail($('d'), 'Choose today or a future date.')
  ].every(Boolean);
  if (!ok) return;
  $('ok').hidden = false;
  $('ok').textContent = `Thanks ${$('n').value.trim()}! Table for ${$('g').value} on ${$('d').value} requested. We'll call you to confirm.`;
  $('rsv').reset();
});
$('y').textContent = new Date().getFullYear();
