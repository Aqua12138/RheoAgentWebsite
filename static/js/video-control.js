document.addEventListener("DOMContentLoaded", () => {
	const taskSelect = document.getElementById("task-select");
	const materialSelect = document.getElementById("material-select");
  
	// 下拉框绑定
	taskSelect.addEventListener("change", updateVideos);
	materialSelect.addEventListener("change", updateVideos);
  
	// 初始自动更新视频
	updateVideos();
  });
  
  function updateVideos() {
	const task = document.getElementById("task-select").value;
	const material = document.getElementById("material-select").value;
  
	const taskKey = task.toLowerCase().replace(/\s+/g, "_");
	const materialKey = material.toLowerCase().replace(/[\s\-]+/g, "_");
  
	// 组合路径
	const successPath = `./static/videos/${taskKey}_${materialKey}_success.mp4`;
	const failPath = `./static/videos/${taskKey}_${materialKey}_fail.mp4`;
  
	updateSingleVideo("success", successPath);
	updateSingleVideo("fail", failPath);
  }
  
  function updateSingleVideo(type, path) {
	const video = document.getElementById(`video-${type}`);
	const source = document.getElementById(`source-${type}`);
	const fallback = document.getElementById(`fallback-${type}`);
  
	// 清除旧事件
	video.onerror = null;
	video.onloadeddata = null;
  
	// 设置新路径并注册事件
	video.onerror = () => {
	  fallback.style.display = "block";
	};
  
	video.onloadeddata = () => {
	  fallback.style.display = "none";
	};
  
	source.src = path;
	video.load();
  }
  