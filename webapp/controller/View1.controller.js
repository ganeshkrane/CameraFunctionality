sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("CameraFunctionality.controller.View1", {
				init:function(){
			
		},
	
	onpressOpenCam:function(){
		 if(!this.frag) {
   this.frag=new sap.ui.xmlfragment("CameraFunctionality.view.CameraDialog",this);
  }
  this.getView().addDependent(this.frag);
  var handleSuccess = function(stream){
				player.srcObject = stream;
			};
			navigator.mediaDevices.getUserMedia({
				video: true
			}).then(handleSuccess);
  this.frag.open();
	},
	onCancel:function(){
		this.frag.close();	
	},
	getnsetImage:function(){
		var attachName = sap.ui.getCore().byId("PicInputId").getValue();
		var oVBox = this.getView().byId("VBox1Id");
			var items = oVBox.getItems();
			var snapId = 'Img-' + items.length;
			var textId = snapId + '-text';
			var imageVal = this.imageVal;

			//set that as a canvas element on HTML page
			var oCanvas = new sap.ui.core.HTML({
				content: "<canvas id='" + snapId +"' width='320px' height='320px' "+ 
				" style='2px solid red'></canvas> " + 
				" <label id='" + textId + "'>" + attachName + "</label>"
			});
			oVBox.addItem(oCanvas);
			var that=this;
			oCanvas.addEventDelegate({
				onAfterRendering: function(){
					var snapShotCanvas = document.getElementById(snapId);
					var oContext = snapShotCanvas.getContext('2d');
					oContext.drawImage(imageVal, 0,0, snapShotCanvas.width, snapShotCanvas.height);
					
				}	
			});
	},
	onCapturePic:function(evt){
		this.imageVal = document.getElementById("player");
		this.frag.attachBeforeClose(this.getnsetImage, this);
		this.frag.close();
	},
	
	});
});