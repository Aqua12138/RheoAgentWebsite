const captions = {
	pour_task: {
	  inviscid_fluid: {
		success: "(0:06) Early alignment enabled timely positioning and stable outflow.",
		fail: "(0:04) Spontaneous flow onset occurred, causing premature outflow."
	  },
	  viscous_fluid: {
		success: "(0:08) Viscous correction was learned, stabilizing the flow trajectory during pouring. ",
		fail: "(0:05) Viscous fingering emerged, disrupting the flow trajectory."
	  },
	  elasto_plastic_fluid: {
		success: "(0:04–0:08) Cup shaking was applied, overcoming adhesion-induced retention and enabling elasto-plastic fluid release.",
		fail: "(0:08) Adhesion-induced retention occurred, preventing complete discharge."
	  }
	},
	gather_task: {
	  inviscid_fluid: {
		success: "Granular materials gathered cleanly into the container.",
		fail: "Failure: Spillage occurred due to coarse alignment."
	  },
	  viscous_fluid: {
		success: "Effective fluid gathering using adjusted suction trajectory.",
		fail: "Failure: Fluid missed target due to imprecise movement."
	  },
	  elasto_plastic_fluid: {
		success: "Effective fluid gathering using adjusted suction trajectory.",
		fail: "Failure: Fluid missed target due to imprecise movement."
	  }
	}
  };

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
  
	// ✅ 在这里插入 console.log
	console.log("taskKey:", taskKey, "materialKey:", materialKey);

	// 组合路径
	const successPath = `./static/videos/${taskKey}_${materialKey}_success.mp4`;
	const failPath = `./static/videos/${taskKey}_${materialKey}_fail.mp4`;
  
	updateSingleVideo("success", successPath);
	updateSingleVideo("fail", failPath);

	// 新增 caption 文字同步
	const captionSuccess = document.getElementById("caption-success");
	const captionFail = document.getElementById("caption-fail");
  
	const taskObj = captions[taskKey] || {};
	const materialObj = taskObj[materialKey] || {};
  
	captionSuccess.innerHTML = materialObj.success || "No caption for this combination.";
	captionFail.innerHTML = materialObj.fail || "No caption for this combination.";
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


  