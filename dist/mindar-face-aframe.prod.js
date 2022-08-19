(()=>{"use strict";const e="mindar-face-system",t="mindar-face-default-face-occluder",i="mindar-video",s="camera",n="mesh",o="arError",a=e=>null==e;AFRAME.registerComponent("mindar-face",{dependencies:[e],el:null,schema:{autoStart:{type:"boolean",default:!0},faceOccluder:{type:"boolean",default:!0},uiLoading:{type:"string",default:"yes"},uiScanning:{type:"string",default:"yes"},uiError:{type:"string",default:"yes"},filterMinCF:{type:"number",default:-1},filterBeta:{type:"number",default:-1},shouldFaceUser:{type:"boolean",default:!0},_positionSettings:{type:"string",default:"absolute"},_positionZIndex:{type:"int",default:-2}},init:function(){if(!this.el.sceneEl)return;const e=this.el.sceneEl.systems["mindar-face-system"];if(this.data.faceOccluder){const e=document.createElement("a-entity");e.setAttribute(t,!0),this.el.sceneEl.appendChild(e)}e.setup({uiLoading:this.data.uiLoading,uiScanning:this.data.uiScanning,uiError:this.data.uiError,filterMinCF:-1===this.data.filterMinCF?null:this.data.filterMinCF,filterBeta:-1===this.data.filterBeta?null:this.data.filterBeta,shouldFaceUser:this.data.shouldFaceUser,_positionSettings:this.data._positionSettings,_positionZIndex:this.data._positionZIndex}),this.data.autoStart&&this.el.sceneEl.addEventListener("renderstart",(()=>{e.start()}))}}),AFRAME.registerComponent(t,{el:null,init:function(){this.el.sceneEl&&(this.el.sceneEl.systems["mindar-face-system"].registerFaceMesh(this),this.el.object3D.matrixAutoUpdate=!1)},updateVisibility(e){this.el.object3D.visible=e},updateMatrix(e){e&&this.el.object3D.matrix.set(...e)},addFaceMesh(e){const t=new AFRAME.THREE.MeshBasicMaterial({colorWrite:!1}),i=new AFRAME.THREE.Mesh(e,t);this.el.setObject3D(n,i)}}),AFRAME.registerComponent("mindar-face-occluder",{el:null,init:function(){this.el.addEventListener("model-loaded",this.onModelLoaded.bind(this)),this.el.addEventListener("model-error",this.onModelError.bind(this))},onModelLoaded:function(){this.el.getObject3D(n).traverse((e=>{if(e.isMesh){const t=new AFRAME.THREE.MeshStandardMaterial({colorWrite:!1});e.material=t}}))},onModelError:function(){console.warn("Model failed to load.")}}),AFRAME.registerComponent("mindar-face-target",{dependencies:[e],el:null,schema:{anchorIndex:{type:"number"}},init:function(){if(!this.el.sceneEl)return;this.el.sceneEl.systems["mindar-face-system"].registerAnchor(this,this.data.anchorIndex);const e=this.el.object3D;e.visible=!1,e.matrixAutoUpdate=!1},updateVisibility(e){this.el.object3D.visible=e},updateMatrix(e){e&&this.el.object3D.matrix.set(...e)}});const{Controller:r,UI:l}=window.MINDAR.FACE;AFRAME.registerSystem(e,{container:null,video:null,anchorEntities:[],faceMeshEntities:[],filterMinCF:-1/0,filterBeta:1/0,controller:null,ui:null,el:null,shouldFaceUser:!0,lastHasFace:!1,_positionSettings:"absolute",_positionZIndex:-2,init:function(){this.anchorEntities=[],this.faceMeshEntities=[]},setup:function({uiLoading:e,uiScanning:t,uiError:i,filterMinCF:s,filterBeta:n,shouldFaceUser:o,_positionSettings:r,_positionZIndex:h}){this.ui=new l({uiLoading:e,uiScanning:t,uiError:i}),this.filterMinCF=s,this.filterBeta=n,this.shouldFaceUser=o,a(r)||(this._positionSettings=r),a(h)||(this._positionZIndex=h)},registerFaceMesh:function(e){this.faceMeshEntities.push({el:e})},registerAnchor:function(e,t){this.anchorEntities.push({el:e,targetIndex:t})},start:function(){this.el.sceneEl&&this.el.sceneEl.parentNode&&(this.container=this.el.sceneEl.parentNode,this.ui.showLoading(),this._startVideo())},stop:function(){if(this.pause(),!this.video)return;const{srcObject:e}=this.video;e&&(e.getTracks().forEach((function(e){e.stop()})),this.video.remove())},switchCamera:function(){this.shouldFaceUser=!this.shouldFaceUser,this.stop(),this.start()},pause:function(e=!1){e||this.video.pause(),this.controller.stopProcessVideo()},unpause:function(){this.video.play(),this.controller.processVideo(this.video)},_removeOldVideo:function(){const e=document.getElementById(i);if(this.pause(),!e)return;const{srcObject:t}=e;t&&(t.getTracks().forEach((function(e){e.stop()})),e.remove())},_startVideo:async function(){if(this._removeOldVideo(),this.video=document.createElement("video"),this.video.id=i,this.video.setAttribute("autoplay",""),this.video.setAttribute("muted",""),this.video.setAttribute("playsinline",""),this.video.style.position=this._positionSettings,this.video.style.top="0px",this.video.style.left="0px",this.video.style.zIndex=`${this._positionZIndex}`,this.container.appendChild(this.video),!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return this.el.emit(o,{error:"VIDEO_FAIL"}),void this.ui.showCompatibility();try{const e=(await navigator.mediaDevices.enumerateDevices()).filter((e=>"videoinput"===e.kind));let t="environment";e.length>1&&(t=this.shouldFaceUser?"user":"environment");const i=await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:t}});this.video.addEventListener("loadedmetadata",(async()=>{this.video.setAttribute("width",this.video.videoWidth.toString()),this.video.setAttribute("height",this.video.videoHeight.toString()),await this._setupAR(),this._processVideo(),this.ui.hideLoading()})),this.video.srcObject=i}catch(e){console.log("getUserMedia error",e),this.el.emit(o,{error:"VIDEO_FAIL"})}},_processVideo:function(){this.controller.onUpdate=({hasFace:e,estimateResult:t})=>{if(e&&!this.lastHasFace&&this.el.emit("face-targetFound"),!e&&this.lastHasFace&&this.el.emit("face-targetLost"),this.lastHasFace=!!e,e&&t){const{faceMatrix:e}=t;for(let e=0;e<this.anchorEntities.length;e++){const t=this.controller.getLandmarkMatrix(this.anchorEntities[e].targetIndex);this.anchorEntities[e].el.updateVisibility(!0),this.anchorEntities[e].el.updateMatrix(t)}for(let t=0;t<this.faceMeshEntities.length;t++)this.faceMeshEntities[t].el.updateVisibility(!0),this.faceMeshEntities[t].el.updateMatrix(e)}else{for(let e=0;e<this.anchorEntities.length;e++)this.anchorEntities[e].el.updateVisibility(!1);for(let e=0;e<this.faceMeshEntities.length;e++)this.faceMeshEntities[e].el.updateVisibility(!1)}},this.controller.processVideo(this.video)},_setupAR:async function(){this.controller=new r({filterMinCF:this.filterMinCF,filterBeta:this.filterBeta}),this._resize(),await this.controller.setup(this.video),await this.controller.dummyRun(this.video);const{fov:e,aspect:t,near:i,far:n}=this.controller.getCameraParams(),o=new AFRAME.THREE.PerspectiveCamera;o.fov=e,o.aspect=t,o.near=i,o.far=n,o.updateProjectionMatrix();const a=this.container.getElementsByTagName("a-camera")[0];a.setObject3D(s,o),a.setAttribute(s,"active",!0);for(let e=0;e<this.faceMeshEntities.length;e++)this.faceMeshEntities[e].el.addFaceMesh(this.controller.createThreeFaceGeometry());this._resize(),window.addEventListener("resize",this._resize.bind(this)),this.el.emit("arReady")},_resize:function(){((e,t)=>{let i,s;const n=e.videoWidth/e.videoHeight;n>t.clientWidth/t.clientHeight?(s=t.clientHeight,i=s*n):(i=t.clientWidth,s=i/n),e.style.top=-(s-t.clientHeight)/2+"px",e.style.left=-(i-t.clientWidth)/2+"px",e.style.width=i+"px",e.style.height=s+"px"})(this.video,this.container);const e=this.container.getElementsByTagName("a-scene")[0];e.style.top=this.video.style.top,e.style.left=this.video.style.left,e.style.width=this.video.style.width,e.style.height=this.video.style.height}})})();