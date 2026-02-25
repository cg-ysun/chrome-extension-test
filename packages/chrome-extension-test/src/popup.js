const input = document.getElementById('input');
const chars = document.getElementById('chars');
const words = document.getElementById('words');
const sentences = document.getElementById('sentences');
const lines = document.getElementById('lines');

input.addEventListener('input', () => {
  const text = input.value;
  chars.textContent = text.length;
  words.textContent = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  sentences.textContent = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim()).length;
  lines.textContent = text === '' ? 0 : text.split(/\n/).length;
});
