const textInput = document.getElementById('text-input');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const status = document.getElementById('status');
const shareLink = document.getElementById('share-link');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

const setStatus = (message, isError = false) => {
  status.textContent = message;
  status.style.color = isError ? '#b91c1c' : '#0f172a';
};

copyBtn.addEventListener('click', async () => {
  const text = textInput.value.trim();
  if (!text) {
    setStatus('Please write something before copying.', true);
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    setStatus('Text copied to clipboard. You can now paste it anywhere.');
  } catch {
    setStatus('Clipboard access failed. Please copy manually.', true);
  }
});

generateBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (!text) {
    setStatus('Please write something before generating a link.', true);
    shareLink.textContent = '';
    shareLink.removeAttribute('href');
    return;
  }

  const encodedText = encodeURIComponent(text);
  const url = `${window.location.origin}${window.location.pathname}?text=${encodedText}`;
  shareLink.href = url;
  shareLink.textContent = url;
  setStatus('Shareable preview link generated.');
});

const params = new URLSearchParams(window.location.search);
const existingText = params.get('text');

if (existingText) {
  textInput.value = existingText;
  setStatus('Loaded text from shared link.');
}
