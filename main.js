window.addEventListener('DOMContentLoaded', () => {
  let taskTitleInputValue = '';
  let taskTitleOutputValue = '';

  // Targets
  const taskTitleInput = document.getElementById('task-title-input');
  const generateBranchNameBtn = document.getElementById(
    'generate-branch-name-btn'
  );
  const taskTitleOutput = document.getElementById('task-title-output');
  const copyToClipboardBtn = document.getElementById('copy-to-clipboard-btn');

  // Handlers
  const handleChangeTaskTitle = (e) => {
    taskTitleInputValue = e.target.value;
    if (taskTitleInputValue) {
      if (generateBranchNameBtn.hasAttribute('disabled')) {
        generateBranchNameBtn.removeAttribute('disabled');
      }
    } else {
      generateBranchNameBtn.setAttribute('disabled', true);
    }
  };

  const generateBranchName = () => {
    if (!taskTitleInputValue) {
      generateBranchNameBtn.setAttribute('disabled', true);
      copyToClipboardBtn.setAttribute('disabled', true);
      return;
    }
    const taskTitleOutputValue = taskTitleInputValue
      .split(' ')
      .map((x) => x.toLowerCase())
      .join('-')
      .replace(/[^a-zA-Z0-9\-]/g, '');
    taskTitleOutput.value = taskTitleOutputValue;
    if (copyToClipboardBtn.hasAttribute('disabled')) {
      copyToClipboardBtn.removeAttribute('disabled');

      const clipboard = new ClipboardJS(copyToClipboardBtn);

      clipboard.on('success', function () {
        copyToClipboardBtn.innerText = 'Copied!';
        setTimeout(() => {
          copyToClipboardBtn.innerText = 'Copy to clipboard';
        }, 1000);
      });

      clipboard.on('error', function () {
        copyToClipboardBtn.innerText = 'Error!';
        setTimeout(() => {
          copyToClipboardBtn.innerText = 'Copy to clipboard';
        }, 1000);
      });
    }
  };

  // Events
  taskTitleInput.addEventListener('change', handleChangeTaskTitle);
  taskTitleInput.addEventListener('input', handleChangeTaskTitle);
  generateBranchNameBtn.addEventListener('click', generateBranchName);
});
