export const lexicalHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<style>
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background: transparent;
    font-family: system-ui, -apple-system, sans-serif;
  }

  .editor-shell {
    position: relative;
    padding: 8px 10px;
    min-height: 40px;
  }

  .editor-input {
    outline: none;
    font-size: 15px;
    line-height: 1.5;
    color: #111;
    min-height: 36px;
    -webkit-user-select: text !important;
    user-select: text !important;
    cursor: text;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .editor-input a {
    color: #2563eb;
    text-decoration: underline;
    cursor: pointer;
  }

  .editor-placeholder {
    position: absolute;
    top: 8px;
    left: 10px;
    color: #999;
    font-size: 15px;
    pointer-events: none;
    user-select: none;
  }

  /* ── Link popup ── */
  #link-popup {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-top: 1px solid #e5e7eb;
    padding: 12px;
    gap: 8px;
    flex-direction: column;
    z-index: 999;
    box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
  }

  #link-popup.open { display: flex; }

  #link-popup input {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    outline: none;
    color: #111;
    -webkit-user-select: text !important;
    user-select: text !important;
  }

  #link-popup input:focus {
    border-color: #2563eb;
  }

  .popup-row {
    display: flex;
    gap: 8px;
  }

  .popup-btn {
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .popup-btn.confirm {
    background: #2563eb;
    color: #fff;
  }

  .popup-btn.cancel {
    background: #f3f4f6;
    color: #374151;
  }

  ul { margin: 4px 0; padding-left: 20px; }
</style>
</head>
<body>

<div id="root"></div>

<!-- Link insertion popup -->
<div id="link-popup">
  <input id="link-text-input" type="text" placeholder="Link label (optional)" />
  <input id="link-url-input" type="url" placeholder="https://example.com" inputmode="url" />
  <div class="popup-row">
    <button class="popup-btn cancel" id="link-cancel">Cancel</button>
    <button class="popup-btn confirm" id="link-confirm">Insert Link</button>
  </div>
</div>

<script>
(function () {
  const root = document.getElementById("root");

  root.innerHTML = \`
    <div class="editor-shell" id="shell">
      <div
        id="editor"
        class="editor-input"
        contenteditable="true"
        data-gramm="false"
        spellcheck="true"
      ></div>
      <div class="editor-placeholder" id="placeholder">Type here...</div>
    </div>
  \`;

  const editor       = document.getElementById("editor");
  const placeholder  = document.getElementById("placeholder");
  const linkPopup    = document.getElementById("link-popup");
  const linkTextInp  = document.getElementById("link-text-input");
  const linkUrlInp   = document.getElementById("link-url-input");
  const linkConfirm  = document.getElementById("link-confirm");
  const linkCancel   = document.getElementById("link-cancel");

  // Saved selection range before popup opens (so we can restore it)
  let savedRange = null;

  // ── Placeholder ────────────────────────────────────────────────────────
  function updatePlaceholder() {
    placeholder.style.display =
      editor.textContent.trim() === "" ? "block" : "none";
  }

  // ── Post HTML to React Native ──────────────────────────────────────────
  function postContent() {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(editor.innerHTML);
    }
  }

  // ── Focus / caret ──────────────────────────────────────────────────────
  function focusEditor() {
    editor.focus();
    const range = document.createRange();
    const sel   = window.getSelection();
    range.selectNodeContents(editor);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // Save current selection so we can restore after popup
  function saveSelection() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRange = sel.getRangeAt(0).cloneRange();
    } else {
      savedRange = null;
    }
  }

  // Restore saved selection
  function restoreSelection() {
    if (!savedRange) return;
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedRange);
  }

  // ── Auto-focus on load ─────────────────────────────────────────────────
  setTimeout(focusEditor, 100);
  setTimeout(focusEditor, 500);

  document.getElementById("shell").addEventListener("click", focusEditor);
  document.getElementById("shell").addEventListener("touchend", function (e) {
    e.preventDefault();
    focusEditor();
  });

  // ── Editor events ──────────────────────────────────────────────────────
  editor.addEventListener("input", function () {
    updatePlaceholder();
    postContent();
  });
  editor.addEventListener("keyup", postContent);
  editor.addEventListener("blur", postContent);

  // ── Link popup logic ───────────────────────────────────────────────────
  function openLinkPopup() {
    // Pre-fill label from selected text
    const sel = window.getSelection();
    const selectedText = sel ? sel.toString() : "";
    saveSelection(); // remember caret/selection

    linkTextInp.value = selectedText;
    linkUrlInp.value  = "";
    linkPopup.classList.add("open");

    // Focus URL input after a tick
    setTimeout(() => linkUrlInp.focus(), 100);
  }

  function closeLinkPopup() {
    linkPopup.classList.remove("open");
    linkTextInp.value = "";
    linkUrlInp.value  = "";
    savedRange = null;
    focusEditor();
  }

  function insertLink() {
    let url   = linkUrlInp.value.trim();
    let label = linkTextInp.value.trim();

    if (!url) {
      linkUrlInp.focus();
      return;
    }

    // Auto-prepend https:// if missing
    if (!/^https?:\\/\\//i.test(url)) {
      url = "https://" + url;
    }

    if (!label) label = url;

    // Restore caret position inside editor
    editor.focus();
    restoreSelection();

    // Insert anchor element
    const anchor    = document.createElement("a");
    anchor.href     = url;
    anchor.target   = "_blank";
    anchor.rel      = "noopener noreferrer";
    anchor.textContent = label;

    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents(); // remove any selected text
      range.insertNode(anchor);

      // Move caret after the link
      range.setStartAfter(anchor);
      range.setEndAfter(anchor);
      sel.removeAllRanges();
      sel.addRange(range);

      // Insert a space after the link so user can keep typing
      document.execCommand("insertText", false, " ");
    }

    updatePlaceholder();
    postContent();
    closeLinkPopup();
  }

  linkConfirm.addEventListener("click", insertLink);
  linkCancel.addEventListener("click", closeLinkPopup);

  // Allow pressing Enter in URL field to confirm
  linkUrlInp.addEventListener("keydown", function (e) {
    if (e.key === "Enter") insertLink();
  });

  // ── Command bridge from React Native ───────────────────────────────────
  function handleCommand(data) {
    if (data.type === "FORMAT") {
      focusEditor();
      if (data.command === "bold") {
        document.execCommand("bold", false, null);
      } else if (data.command === "italic") {
        document.execCommand("italic", false, null);
      }
      postContent();
    }

    if (data.type === "LIST") {
      focusEditor();
      document.execCommand("insertUnorderedList", false, null);
      postContent();
    }

    if (data.type === "INSERT") {
      focusEditor();
      document.execCommand("insertText", false, data.text);
      updatePlaceholder();
      postContent();
    }

    if (data.type === "CLEAR") {
      editor.innerHTML = "";
      updatePlaceholder();
      postContent();
      focusEditor();
    }

    // ✅ NEW: open link popup from toolbar button in React Native
    if (data.type === "LINK") {
      openLinkPopup();
    }
  }

  function onMessage(event) {
    try {
      const data = JSON.parse(event.data);
      handleCommand(data);
    } catch (e) {}
  }

  window.addEventListener("message", onMessage);
  document.addEventListener("message", onMessage);

  updatePlaceholder();
})();
</script>
</body>
</html>
`;