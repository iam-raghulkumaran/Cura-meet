let timedata;
var btm = 'bottom'
setInterval(() => {
  fetch('/servertimezone?nocache=' + new Date().getTime())
    .then(response => response.json())
    .then(data => {
      //timedata = data.timezone;
      var now = moment().tz(data.timezone);
      const dateAndTime = moment().tz(data.timezone).format('YYYY-MM-DD HH:mm:ss');
      let timerValue = moment.tz(dateAndTime, data.timezone);
      timerValue.add(1, 'second');
      var updatedtimer = timerValue.format('YYYY-MM-DD ddd HH:mm:ss');
      timedata= updatedtimer
    })
    .catch(error => {
      //console.error('Error fetching count-up clock data:', error);
 if (error instanceof NetworkError) {
    console.error('Network Error:', error.message);
    window.prompt('Network Error:' + error.message);
  } else if (error instanceof CORSError) {
    console.error('CORS Error:', error.message);
    window.prompt('CORS Error:' + error.message);
  } else if (error instanceof ServerError) {
    console.error('Server Error:', error.message);
    window.prompt('Server Error:' + error.message);
  } else {
    console.error('Unknown Error:', error.message);
    window.prompt('Unknown Error:' + error.message);
  }
    });
}, 1000);


function Pen() {


    //This PenDraw is a main function but ||| "NOT ALWAYS" ||| . 
    //There are some other functions that...
    //bypass this and get called directly.
    //let isMirrorVideo;
    this.PenDraw = function PenDraw(ctx, objDrawVariables) { //Gets called for each media again and again. So no background or scene overlays here.
        // ctx.fillRect(0, 0, objDrawVariables.canvaswidth, objDrawVariables.canvasheight);
        //if (objDrawVariables.isMirrorVideo != undefined) { isMirrorVideo = objDrawVariables.isMirrorVideo }

        DrawSceneBorder(ctx, objDrawVariables);

        DrawMedia(ctx, objDrawVariables);

        DrawSceneOverlays(ctx, objDrawVariables);
        DrawMainCanvas(ctx, objDrawVariables);


    }


    /////////////////////////👇👇👇👇👇👇👇👇 GLOBAL PEN FUNCTIONS 👇👇👇👇👇👇👇👇

    this.DrawBackground = function (ctx, objDrawVariables) { //Not called inside PenDraw. Only used inside PreDraw which is directly called from the TImeline

        ctx.fillStyle = objDrawVariables.scenebackcolor;
        ctx.fillRect(0, 0, objDrawVariables.canvaswidth, objDrawVariables.canvasheight);
        ctx.save();
        ctx.globalAlpha = objDrawVariables.backgroundAlpha;
        if (objDrawVariables.backgroundimg != '' && objDrawVariables.backgroundimg != null) ctx.drawImage(objDrawVariables.backgroundimg, 0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
        ctx.globalAlpha = 1;

    }

    function DrawMainCanvas(ctx, objDrawVariables) {
        if (objDrawVariables.mainCanvasContext)
            objDrawVariables.mainCanvasContext.drawImage(ctx.canvas, 0, 0, objDrawVariables.canvaswidth, objDrawVariables.canvasheight);
    }


    this.PreDraw = function PreDraw(ctx, objDrawVariables) { //Wont be CALLED HERE.will ONLY be called by the timeline before drawing
        this.DrawBackground(ctx, objDrawVariables);

    }



    this.PostDraw = function PostDraw(ctx, objDrawVariables) { //Wont be CALLED HERE.will ONLY be called by the timeline after drawing all the media
        //Whatever is drawn here gets cleared by the PreDraw!! Looks like last becomes first.

    }

    //////////// 👇👇👇👇👇👇👇👇  |*|*|*| MEDIA PEN FUNCTIONS 👇👇👇👇👇👇👇👇 ||||||||||||||

function DrawMedia(ctx, objDrawVariables) {

         ctx.save(); //Start Alpha work
         ctx.globalAlpha = objDrawVariables.mediaAlpha;
         DrawMediaBorder(ctx, objDrawVariables);
         if (objDrawVariables.video && objDrawVariables.video != '') {
		 this.videodraw_x = (objDrawVariables.videocropw - (objDrawVariables.videocroph * 16) / 9) / 2;
		 this.videodraw_y = (objDrawVariables.videocroph - objDrawVariables.videocropw * 9 / 16) / 2
                 this.videodraw_w = (objDrawVariables.videocroph * 16) / 9;
                 this.videodrwa_h = objDrawVariables.videocropw * 9 / 16
             if (objDrawVariables.isMirrorVideo) {
                 ctx.translate(objDrawVariables.w, 0);
                 ctx.scale(-1, 1);
		    if (objDrawVariables.videocroph > objDrawVariables.videocropw) {
                    ctx.drawImage(objDrawVariables.video, this.videodraw_x, objDrawVariables.videocropy, this.videodraw_w, objDrawVariables.videocroph, -objDrawVariables.x, objDrawVariables.y, objDrawVariables.w, objDrawVariables.h);
                } else if (objDrawVariables.videocroph < objDrawVariables.videocropw) {
                    ctx.drawImage(objDrawVariables.video, objDrawVariables.videocropx, this.videodraw_y, objDrawVariables.videocropw, this.videodrwa_h, -objDrawVariables.x, objDrawVariables.y, objDrawVariables.w, objDrawVariables.h);
                 } 
		}
             else {
                 ctx.drawImage(objDrawVariables.video, objDrawVariables.videocropx,  objDrawVariables.videocropy, objDrawVariables.videocropw, objDrawVariables.videocroph, objDrawVariables.x, objDrawVariables.y, objDrawVariables.w, objDrawVariables.h)
             }
             ctx.setTransform(1, 0, 0, 1, 0, 0);

         }

         // if (objDrawVariables.video && objDrawVariables.video != '') ctx.drawImage(objDrawVariables.video, objDrawVariables.videocropx, objDrawVariables.videocropy, objDrawVariables.videocropw, objDrawVariables.videocroph, objDrawVariables.x, objDrawVariables.y, objDrawVariables.w, objDrawVariables.h);
         ctx.globalAlpha = 1;
         ctx.restore(); //End Alpha work

         DrawMediaOverlays(ctx, objDrawVariables);

     }

    function DrawMediaBorder(ctx, objDrawVariables) {
        ctx.lineWidth = objDrawVariables.mediaborderthickness;
        ctx.strokeStyle = objDrawVariables.mediabordercolor;
        ctx.strokeRect(objDrawVariables.x, objDrawVariables.y, objDrawVariables.w, objDrawVariables.h);

    }


    function DrawMediaOverlays(ctx, objDrawVariables) { //Called inside DrawMedia because it needs to draw media specific overlays.


        HandleOverlays(ctx, objDrawVariables, objDrawVariables.overlays);

    }



    ///############################ 👇👇👇👇👇👇 SCENE RELATED THINGS 👇👇👇👇👇👇 ###################################

    function DrawSceneBorder(ctx, objDrawVariables) {
        ctx.lineWidth = objDrawVariables.sceneborderthickness;
        ctx.strokeStyle = objDrawVariables.scenebordercolor;
        ctx.strokeRect(0, 0, objDrawVariables.canvaswidth, objDrawVariables.canvasheight);
    }

    function HandleOverlays(ctx, objDrawVariables, overlays) {
        if (overlays) {
            overlays.forEach((eachoverlay) => {
                if (eachoverlay.type) {
                    switch (eachoverlay.type) {
                        case "tickeroverlay":
                            DrawTickerOVerlay(ctx, objDrawVariables, eachoverlay);
                            break;
                        case "rectangleoverlay":
                            DrawRectangleOverlay(ctx, objDrawVariables, eachoverlay);
                            break;
                        case "textoverlay":
                            DrawTextOverlay(ctx, objDrawVariables, eachoverlay);
                            break;
                        case "imageoverlay":
                            DrawImageOverlay(ctx, objDrawVariables, eachoverlay);
                            break;
                        default:
                            break;
                    }
                    if (eachoverlay.overlays && eachoverlay.overlays.length > 0) {
                        HandleOverlays(ctx, objDrawVariables, eachoverlay.overlays);
                    }

                } else {
                    throw "Error. Overlays with no type???";
                }
            });
        }
    }

    function DrawSceneOverlays(ctx, objDrawVariables) {
        if (objDrawVariables.sceneoverlays && objDrawVariables.sceneoverlays.length > 0) {

            HandleOverlays(ctx, objDrawVariables, objDrawVariables.sceneoverlays);

        }

    }


    //######################################   ##   Shapes and Utilities        👇👇👇     /////////////////////////////////////////////////////

    function DrawImageOverlay(ctx, objDrawVariables, eachoverlay) {
        ctx.save();
        ctx.globalAlpha = eachoverlay.mainAlpha.current;
        ctx.drawImage(eachoverlay.image, eachoverlay.x.current, eachoverlay.y.current);
        ctx.globalAlpha = 1;
        ctx.restore();


    }


    function DrawTickerOVerlay(ctx, objDrawVariables, eachTickerOverlay) {



        let yvariation = 10;
        ctx.font = eachTickerOverlay.font;

        DrawRoundRectBackground(ctx, 0, eachTickerOverlay.y.current, objDrawVariables.sceneendx, eachTickerOverlay.textheight,
            0, true, eachTickerOverlay.backcolor, eachTickerOverlay.backgroundAlpha, true, eachTickerOverlay.bordercolor,
            eachTickerOverlay.borderAlpha, eachTickerOverlay.borderthickness);

        DrawText(ctx, eachTickerOverlay.x.current, eachTickerOverlay.y.current + eachTickerOverlay.yspacing, eachTickerOverlay.content, eachTickerOverlay.font,
            'top', eachTickerOverlay.forecolor, eachTickerOverlay.foregroundAlpha);
    }


    function DrawRectangleOverlay(ctx, objDrawVariables, eachoverlay) {
        // if (eachoverlay.name == "rectangle-lower-third") debugger;
        DrawRoundRectBackground(ctx, eachoverlay.x.current, eachoverlay.y.current, eachoverlay.w.current, eachoverlay.h.current,
            eachoverlay.radius, true, eachoverlay.backcolor.toRGBAString('current'), eachoverlay.mainAlpha.current,
            true, eachoverlay.bordercolor.toRGBAString('current'),
            eachoverlay.mainAlpha.current, eachoverlay.borderthickness);
    }


    function DrawTextOverlay(ctx, objDrawVariables, eachoverlay) {
        //let bgextrawidth = 30;
        //let xspacing = 12;
        //let yspacing = 10;
        //let radius = 10;
        // ctx.font = font;

        //DrawRoundRectBackground(ctx, eachoverlay.x.current, eachoverlay.y.current, eachoverlay.w.current, eachoverlay.h.current,
        //    eachoverlay.radius, true, eachoverlay.backcolor, eachoverlay.backgroundAlpha, true, eachoverlay.bordercolor,
        //    eachoverlay.borderAlpha, eachoverlay.borderthickness);

       DrawText(ctx, eachoverlay.x.current, eachoverlay.y.current, eachoverlay.text,
            eachoverlay.font, 'top', eachoverlay.forecolor, eachoverlay.mainAlpha.current);

	//record Timing
	if(btm == eachoverlay.top_or_bottom){
	 DrawtimeText(ctx, eachoverlay.x.current-5, eachoverlay.y.current-15, timedata,
            eachoverlay.font, 'bottom', eachoverlay.forecolor, eachoverlay.mainAlpha.current);
	}
}
    function DrawText(ctx, x, y, txt, font, textBaseline, forecolor, foregroundAlpha) {
        ctx.save();
        ctx.globalAlpha = foregroundAlpha;
        ctx.font = font;
        ctx.textBaseline = textBaseline;
        ctx.fillStyle = forecolor.toRGBAString('current');
        ctx.fillText(txt, x, y);
        ctx.globalAlpha = 1;
        ctx.restore();

    }
 async function  DrawtimeText(ctx, x, y, txt, font, textBaseline, forecolor, foregroundAlpha){
	 ctx.save();
        ctx.globalAlpha = foregroundAlpha;
        ctx.font = font;
        ctx.textBaseline = textBaseline;
        ctx.fillStyle = forecolor.toRGBAString('current');
        //ctx.fillText(txt, x, y);
	 await new Promise(resolve => setTimeout(ctx.fillText(txt,x,y), 1000))
        ctx.globalAlpha = 1;
        ctx.restore();

	}




    function DrawRoundRectBackground(ctx, x, y, width, height, radius, fill, backcolor, backgroundAlpha, enableborder, bordercolor, borderAlpha, borderthickness = 5) {

        if (typeof enableborder === 'undefined') {
            enableborder = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
            var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        if (borderthickness) ctx.lineWidth = borderthickness;

        ctx.save();
        ctx.globalAlpha = borderAlpha;
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        ctx.globalAlpha = 1;

        ctx.restore();

        if (fill) {
            ctx.save();
            ctx.globalAlpha = backgroundAlpha;
            ctx.fillStyle = backcolor;
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.restore();
        }
        if (enableborder) {
            ctx.save();
            ctx.globalAlpha = borderAlpha;
            ctx.strokeStyle = bordercolor;
            ctx.stroke();
            ctx.restore();
            ctx.globalAlpha = 1;
        }

    }








}
