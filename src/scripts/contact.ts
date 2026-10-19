// Email links and "copy address" buttons (see src/consts.ts → mailLink).
// The address only exists base64-encoded in the HTML; it is decoded here,
// at click time, so crawlers that read the page source never see it.
// One delegated listener covers every link on the page.

const decode = (value: string) => atob(value);

document.addEventListener('click', async (event) => {
  const target = event.target instanceof Element ? event.target : null;

  const link = target?.closest<HTMLElement>('[data-mailto]');
  if (link?.dataset.mailto) {
    event.preventDefault();
    const subject = link.dataset.mailSubject;
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
    window.location.href = `mailto:${decode(link.dataset.mailto)}${query}`;
    return;
  }

  const button = target?.closest<HTMLButtonElement>('[data-copy-email]');
  if (button?.dataset.copyEmail) {
    const label = button.querySelector<HTMLElement>('[data-label]') ?? button;
    const address = decode(button.dataset.copyEmail);
    try {
      await navigator.clipboard.writeText(address);
      label.textContent = button.dataset.done ?? address;
      setTimeout(() => (label.textContent = button.dataset.idle ?? ''), 2000);
    } catch {
      // Clipboard refused: show the address so it can be selected by hand.
      label.textContent = address;
    }
  }
});
