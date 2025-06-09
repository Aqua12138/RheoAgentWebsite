// 当前状态，默认选中为 "Success"
let currentStatus = "Success";

document.addEventListener("DOMContentLoaded", () => {
  const taskSelect = document.getElementById("task-select");
  const materialSelect = document.getElementById("material-select");
  const statusButtons = document.querySelectorAll(".buttons.has-addons button");

  // 下拉框事件绑定
  taskSelect.addEventListener("change", updateVideo);
  materialSelect.addEventListener("change", updateVideo);

  // 状态按钮绑定点击事件
  statusButtons.forEach(button => {
    button.addEventListener("click", () => {
      statusButtons.forEach(btn => btn.classList.remove("is-selected", "is-black"));
      button.classList.add("is-selected", "is-black");
      currentStatus = button.textContent.trim();
      updateVideo();
    });
  });

  // 页面初次加载时，触发一次更新
  updateVideo();
});

function updateVideo() {
  const task = document.getElementById("task-select").value;
  const material = document.getElementById("material-select").value;

  const taskKey = task.toLowerCase().replace(/\s+/g, "_");
  const materialKey = material.toLowerCase().replace(/[\s\-]+/g, "_");
  const statusKey = currentStatus.toLowerCase();

  const videoFile = `./static/videos/${taskKey}_${materialKey}_${statusKey}.mp4`;

  const video = document.getElementById("result-video");
  const source = document.getElementById("video-source");
  const fallbackText = document.getElementById("video-fallback");

  // 清除旧的错误/加载事件
  video.onerror = null;
  video.onloadeddata = null;

  // 设置新路径之前绑定事件
  video.onerror = () => {
    fallbackText.style.display = "block";
  };

  video.onloadeddata = () => {
    fallbackText.style.display = "none";
  };

  // 更新 source 并加载
  source.src = videoFile;
  video.load();
}
