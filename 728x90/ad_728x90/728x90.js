(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.primary_cta = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSAXIAAhCQAIgCAKAAIAAAVIATAAIgCAPIgRAAIAAAeQAAALAIAAQAFAAAFgCIgCAOQgGACgHABQgVAAAAgYg");
	this.shape.setTransform(126.625,17.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAMAkIAAgqQAAgOgMAAQgFAAgGAFIAAAzIgSAAIAAhFIAQAAIACALQAGgNAMAAQAMAAAFAHQAGAGAAAMIAAAug");
	this.shape_1.setTransform(120.125,18.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgYAdQgFgGAAgMIAAguIASAAIAAArQAAAOALAAQAGAAAGgGIAAgzIASAAIAABFIgRAAIgBgLQgGANgMAAQgMAAgGgHg");
	this.shape_2.setTransform(112.425,18.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgYAbQgJgJAAgSQAAgQAJgKQAJgJAPAAQAQAAAJAJQAJAKAAAQQAAARgJAKQgJAKgQAAQgPAAgJgKgAgOAAQAAAWAOAAQAPAAAAgWQAAgVgPAAQgOAAAAAVg");
	this.shape_3.setTransform(104.775,18.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPAcQgJgKAAgRQAAgSAJgJQAJgKAPABQAKgBAGADQAAAIgBAGQgGgCgGAAQgSAAAAAWQAAAKAFAGQAEAFAJAAQAHABAGgEIgCAPQgFADgJAAQgPAAgJgJg");
	this.shape_4.setTransform(97.925,18.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgPAcQgJgKAAgRQAAgSAJgJQAJgKAPABQAKgBAGADQAAAIgBAGQgGgCgGAAQgSAAAAAWQAAAKAFAGQAEAFAJAAQAHABAGgEIgCAPQgFADgJAAQgPAAgJgJg");
	this.shape_5.setTransform(91.925,18.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAWAxIgFgUIgiAAIgGAUIgSAAIAehfQAIgCAOAAIAfBhgAANANIgNgsIgMAsIAZAAg");
	this.shape_6.setTransform(84.675,16.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgXAqQgHgJgBgSQABgkAiAAIAJAAIAAgaQAKgCAIAAIAABiIgQAAIgBgJQgGAKgLABQgMAAgIgJgAgMAPQAAAWAOgBQAHAAAEgEIAAgnIgJAAQgQAAAAAWg");
	this.shape_7.setTransform(73.1,16.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgOAdIAAhMQAIgCAIAAIAABNQAAAIAIAAIAFgBIgCAOQgEABgGABQgRAAAAgWg");
	this.shape_8.setTransform(67.7,16.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgYAbQgJgJAAgSQAAgQAJgKQAJgJAPAAQAQAAAJAJQAJAKAAAQQAAARgJAKQgJAKgQAAQgPAAgJgKgAgOAAQAAAWAOAAQAPAAAAgWQAAgVgPAAQgOAAAAAVg");
	this.shape_9.setTransform(61.525,18.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgZAlQgMgOAAgXQAAgXAMgNQAOgOAXAAQAPAAALAEIgDAQQgLgEgMAAQgOAAgIAJQgIAJAAAQQAAARAIAJQAHAJAOAAIAJgBIAAgkIASAAIAAAwQgLAFgSAAQgVAAgNgOg");
	this.shape_10.setTransform(52.975,16.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAOAjIgOgvIgOAvIgQAAIgXhFIATAAIANAyIAOgyIAQAAIAPAyIANgyIARAAIgWBFg");
	this.shape_11.setTransform(39.8,18.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgfAAQABgQAHgJQAJgLAPABQAPgBAIAKQAIAHgBAOIgBAMIgqAAQABAJAFADQAFAEAIgBQALAAALgEIgCAOQgKAEgLABQglAAAAglgAANgFQAAgRgMAAQgMAAgCARIAaAAIAAAAg");
	this.shape_12.setTransform(30.55,18.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgIAzIAAhFIARAAIAABFgAgGggQgEgDAAgFQAAgEAEgDQADgDADAAQAEAAADADQAEADAAAEQAAAFgEADQgDADgEAAQgDAAgDgDg");
	this.shape_13.setTransform(25.2,16.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgKAwIgdhgIATAAIAUBOIAWhOIATAAIgeBgg");
	this.shape_14.setTransform(19.25,16.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#EC0000").ss(1,1,1).p("AolipIRLAAQBHAAAxAyQAyAyAABFQAABGgyAyQgxAyhHAAIxLAAQhHAAgygyQgxgyAAhGQAAhFAxgyQAygyBHAAg");
	this.shape_15.setTransform(72,17);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#EC0000").s().p("AolCqQhHAAgygyQgxgyAAhGQAAhFAxgyQAygyBHAAIRLAAQBGAAAyAyQAyAyAABFQAABGgyAyQgyAyhGAAg");
	this.shape_16.setTransform(72,17);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#EC0000").s().p("AgSAXIAAhCQAIgCAKAAIAAAVIATAAIgCAPIgRAAIAAAeQAAALAIAAQAFAAAFgCIgCAOQgGACgHABQgVAAAAgYg");
	this.shape_17.setTransform(126.625,17.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#EC0000").s().p("AAMAkIAAgqQAAgOgMAAQgFAAgGAFIAAAzIgSAAIAAhFIAQAAIACALQAGgNAMAAQAMAAAFAHQAGAGAAAMIAAAug");
	this.shape_18.setTransform(120.125,18.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#EC0000").s().p("AgYAdQgFgGAAgMIAAguIASAAIAAArQAAAOALAAQAGAAAGgGIAAgzIASAAIAABFIgRAAIgBgLQgGANgMAAQgMAAgGgHg");
	this.shape_19.setTransform(112.425,18.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#EC0000").s().p("AgYAbQgJgJAAgSQAAgQAJgKQAJgJAPAAQAQAAAJAJQAJAKAAAQQAAARgJAKQgJAKgQAAQgPAAgJgKgAgOAAQAAAWAOAAQAPAAAAgWQAAgVgPAAQgOAAAAAVg");
	this.shape_20.setTransform(104.775,18.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#EC0000").s().p("AgPAcQgJgKAAgRQAAgSAJgJQAJgKAPABQAKgBAGADQAAAIgBAGQgGgCgGAAQgSAAAAAWQAAAKAFAGQAEAFAJAAQAHABAGgEIgCAPQgFADgJAAQgPAAgJgJg");
	this.shape_21.setTransform(97.925,18.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#EC0000").s().p("AgPAcQgJgKAAgRQAAgSAJgJQAJgKAPABQAKgBAGADQAAAIgBAGQgGgCgGAAQgSAAAAAWQAAAKAFAGQAEAFAJAAQAHABAGgEIgCAPQgFADgJAAQgPAAgJgJg");
	this.shape_22.setTransform(91.925,18.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#EC0000").s().p("AAWAxIgFgUIgiAAIgGAUIgSAAIAehfQAIgCAOAAIAfBhgAANANIgNgsIgMAsIAZAAg");
	this.shape_23.setTransform(84.675,16.925);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#EC0000").s().p("AgXAqQgHgJgBgSQABgkAiAAIAJAAIAAgaQAKgCAIAAIAABiIgQAAIgBgJQgGAKgLABQgMAAgIgJgAgMAPQAAAWAOgBQAHAAAEgEIAAgnIgJAAQgQAAAAAWg");
	this.shape_24.setTransform(73.1,16.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#EC0000").s().p("AgOAdIAAhMQAIgCAIAAIAABNQAAAIAIAAIAFgBIgCAOQgEABgGABQgRAAAAgWg");
	this.shape_25.setTransform(67.7,16.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#EC0000").s().p("AgYAbQgJgJAAgSQAAgQAJgKQAJgJAPAAQAQAAAJAJQAJAKAAAQQAAARgJAKQgJAKgQAAQgPAAgJgKgAgOAAQAAAWAOAAQAPAAAAgWQAAgVgPAAQgOAAAAAVg");
	this.shape_26.setTransform(61.525,18.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#EC0000").s().p("AgZAlQgMgOAAgXQAAgXAMgNQAOgOAXAAQAPAAALAEIgDAQQgLgEgMAAQgOAAgIAJQgIAJAAAQQAAARAIAJQAHAJAOAAIAJgBIAAgkIASAAIAAAwQgLAFgSAAQgVAAgNgOg");
	this.shape_27.setTransform(52.975,16.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#EC0000").s().p("AAOAjIgOgvIgOAvIgQAAIgXhFIATAAIANAyIAOgyIAQAAIAPAyIANgyIARAAIgWBFg");
	this.shape_28.setTransform(39.8,18.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#EC0000").s().p("AgfAAQABgQAHgJQAJgLAPABQAPgBAIAKQAIAHgBAOIgBAMIgqAAQABAJAFADQAFAEAIgBQALAAALgEIgCAOQgKAEgLABQglAAAAglgAANgFQAAgRgMAAQgMAAgCARIAaAAIAAAAg");
	this.shape_29.setTransform(30.55,18.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#EC0000").s().p("AgIAzIAAhFIARAAIAABFgAgGggQgEgDAAgFQAAgEAEgDQADgDADAAQAEAAADADQAEADAAAEQAAAFgEADQgDADgEAAQgDAAgDgDg");
	this.shape_30.setTransform(25.2,16.675);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#EC0000").s().p("AgKAwIgdhgIATAAIAUBOIAWhOIATAAIgeBgg");
	this.shape_31.setTransform(19.25,16.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},1).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	// Layer_2
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#33FF00").s().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	this.shape_32.setTransform(71.05,-234.95);
	this.shape_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_32).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.9,-534.9,300,600);


(lib.mc_level3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#666666").s().p("AgHAHQgDgDAAgEQAAgDADgEQAEgDADAAQAFAAADADQADADAAAEQAAAEgDADQgDAEgFAAQgDAAgEgEg");
	this.shape.setTransform(297.425,21.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("AgdA8IABgOQAMAHAMAAQAagBAAgaIAAgLQgIANgPgBQgQABgKgLQgKgNAAgWQAAgvArAAQASAAAOAFIAABVQAAApgqAAQgOAAgLgGgAgVgSQAAAhAYAAQALAAAIgIIAAg5QgHgCgJAAQgbAAAAAig");
	this.shape_1.setTransform(290.075,19.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("AAUAuIAAg3QAAgXgTAAQgLAAgJAKIAABEIgQAAIAAhZIAPAAIABAOQAJgQARAAQAOAAAHAJQAIAIAAAOIAAA8g");
	this.shape_2.setTransform(280.775,17.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("AgHBAIAAhZIAPAAIAABZgAgGguQgDgDAAgEQAAgFADgDQADgCADAAQAEAAADACQADADAAAFQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_3.setTransform(273.725,16);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#666666").s().p("AgQAoIAAhlQAGgDAJABIAABmQAAANAKAAQAFAAADgCQAAAGgCAHQgFABgGAAQgUAAAAgYg");
	this.shape_4.setTransform(269.575,16.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#666666").s().p("AgXAuIAAhZIAOAAIABANQAIgOAOAAIAKABIgBANIgLgBQgMAAgIAJIAABEg");
	this.shape_5.setTransform(264.05,17.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#666666").s().p("AgaAiQgLgMAAgWQAAgUAJgMQALgOATAAQASAAAKAMQAIAKAAASIAAAMIg7AAQADAcAZAAQAQAAAMgHIgCAOQgNAGgNAAQgWAAgLgNgAAWgGQABgbgWAAQgTAAgDAbIArAAIAAAAg");
	this.shape_6.setTransform(255.7,17.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#666666").s().p("AgVAfIAAhWQAHgDAJAAIAAAaIAbAAIgCAOIgZAAIAAAvQAAARANAAQAHAAAGgDIgBANQgIADgIAAQgZAAAAgcg");
	this.shape_7.setTransform(248.525,16.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#666666").s().p("AgmA5QAAgHACgGQAOAIASAAQAMAAAHgGQAIgFAAgKQAAgJgHgFQgEgFgMgFIgJgEQgcgKgBgYQAAgPALgJQALgJATAAQARAAAOAGQAAAHgCAHQgNgGgPAAQgZAAAAATQAAAJAFAFQAFAFALAEIAJADQAeAKAAAZQAAAQgLAJQgMAKgUAAQgVAAgNgIg");
	this.shape_8.setTransform(240.55,16.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#666666").s().p("AgtA3QgLgLAAgRQAAgbAagJQgJgNAAgNQAAgNAJgHQAJgJASAAQANAAANAFQAAAJgCAGQgMgFgLgBQgVAAAAAPQAAAMALAMIAjAlQAGgPADgUQAFgCAJAAQgCAdgLASIAYAbIgUAAIgNgOQgPAQgXAAQgTAAgMgKgAgjAJQgGAHAAAKQAAALAHAHQAHAIANAAQARAAAMgOIgkgmQgJADgFAGg");
	this.shape_9.setTransform(226.275,16.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#666666").s().p("AgXAuIAAhZIAOAAIABANQAIgOAOAAIAKABIgBANIgLgBQgMAAgIAJIAABEg");
	this.shape_10.setTransform(213.2,17.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#666666").s().p("AgaAoQgIgHAAgNQAAgPALgHQAMgIAbgCIAEAAIAAgDQAAgKgFgEQgEgEgLAAQgPAAgOAHIABgNQANgHARAAQAhAAAAAeIAAA9IgOAAIgBgNQgIAPgSAAQgMAAgIgHgAAQAAQgUAAgIAFQgHAFAAAJQAAAHAEAEQAFAEAHAAQAOAAAJgLIAAgYg");
	this.shape_11.setTransform(204.725,17.925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#666666").s().p("AgQAoIAAhlQAGgDAJABIAABmQAAANAKAAQAFAAADgCQAAAGgCAHQgFABgGAAQgUAAAAgYg");
	this.shape_12.setTransform(198.425,16.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#666666").s().p("AgQAoIAAhlQAGgDAJABIAABmQAAANAKAAQAFAAADgCQAAAGgCAHQgFABgGAAQgUAAAAgYg");
	this.shape_13.setTransform(193.425,16.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#666666").s().p("AgdAiQgLgMAAgWQAAgVALgMQAKgNATAAQATAAALANQALAMAAAVQAAAWgLAMQgLANgTAAQgSAAgLgNgAgYAAQAAAiAYAAQAZAAAAgiQAAghgZAAQgYAAAAAhg");
	this.shape_14.setTransform(185.675,17.925);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#666666").s().p("AguBAIAAh8QANgDAUAAQAeAAAQATQAOAQAAAcQAAAegPAQQgPASgdAAgAgegwIAABiIASAAQAqAAAAgyQAAgxgrAAg");
	this.shape_15.setTransform(175.4,16.025);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#666666").s().p("AgmA5QAAgHADgGQAOAIAQAAQAMAAAIgGQAHgFAAgKQABgJgHgFQgEgFgMgFIgJgEQgdgKAAgYQAAgPALgJQALgJATAAQASAAANAGQgBAHgCAHQgNgGgPAAQgYAAAAATQAAAJAGAFQADAFAMAEIAJADQAeAKAAAZQAAAQgLAJQgMAKgVAAQgTAAgOgIg");
	this.shape_16.setTransform(160.75,16.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#666666").s().p("AggA1QgMgMAAgUIAAhSQAIgCAIAAIAABUQAAAOAIAIQAHAHANAAQAeAAAAgeIAAhRQAHgCAIAAIAABUQAAAUgMAMQgMALgVAAQgUAAgMgLg");
	this.shape_17.setTransform(150.325,16.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#666666").s().p("AgKAWQADgSACgXQAGgDAJAAQgCAegIAOg");
	this.shape_18.setTransform(138.3,22.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#666666").s().p("AgeApQAAgHACgGQALAGAOAAQASAAAAgMQAAgGgDgDQgDgDgIgDIgHgCQgYgGAAgUQAAgLAIgHQAJgHAPAAQAOAAAMAEIgCANQgMgEgLAAQgSAAAAAMQAAAKAPAEIAIADQAXAGAAASQAAAMgJAHQgJAIgPAAQgRAAgLgGg");
	this.shape_19.setTransform(132.275,17.925);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#666666").s().p("AgdAiQgLgMAAgWQAAgVALgMQAKgNATAAQATAAALANQALAMAAAVQAAAWgLAMQgLANgTAAQgSAAgLgNgAgYAAQAAAiAYAAQAZAAAAgiQAAghgZAAQgYAAAAAhg");
	this.shape_20.setTransform(123.525,17.925);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#666666").s().p("AgXAuIAAhZIAPAAIABANQAHgOAOAAIAKABIgBANIgLgBQgMAAgHAJIAABEg");
	this.shape_21.setTransform(116.2,17.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#666666").s().p("AgbAmQgIgIAAgPIAAg8IAQAAIAAA3QAAAXATAAQALAAAJgKIAAhEIAQAAIAABZIgPAAIgBgOQgJAQgRAAQgOAAgHgIg");
	this.shape_22.setTransform(107.575,18.025);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#666666").s().p("AgiA+IAAh7IBFAAIgBAOIg1AAIAAAoIAwAAIgCANIguAAIAAAqIA2AAIgBAOg");
	this.shape_23.setTransform(98.475,16.175);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#666666").s().p("AAUAuIAAg3QAAgXgTAAQgLAAgJAKIAABEIgQAAIAAhZIAPAAIABAOQAJgQARAAQAOAAAHAJQAIAIAAAOIAAA8g");
	this.shape_24.setTransform(84.725,17.825);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#666666").s().p("AgHBAIAAhZIAPAAIAABZgAgGguQgDgDAAgEQAAgFADgDQADgCADAAQAEAAADACQADADAAAFQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_25.setTransform(77.675,16);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#666666").s().p("AgaAiQgLgMAAgWQAAgUAKgMQAKgOATAAQASAAAJAMQAJAKAAASIgBAMIg6AAQADAcAaAAQAPAAAMgHIgCAOQgNAGgNAAQgWAAgLgNgAAXgGQgBgbgVAAQgUAAgCAbIAsAAIAAAAg");
	this.shape_26.setTransform(67.1,17.925);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#666666").s().p("AgQAoIAAhlQAGgDAJABIAABmQAAANAKAAQAFAAADgCQAAAGgCAHQgFABgGAAQgUAAAAgYg");
	this.shape_27.setTransform(60.575,16.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#666666").s().p("AglA8IAAh5QAHgDAJABIAAAwQAIgNAPAAQAQAAAKALQAJANABAVQAAAwgrgBQgSAAgOgEgAgVgHIAAA5QAHACAJAAQAbAAAAgiQAAghgYAAQgLAAgIAIg");
	this.shape_28.setTransform(53.1,16.15);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#666666").s().p("AgaAoQgIgHAAgNQAAgPALgHQAMgIAbgCIAEAAIAAgDQAAgKgFgEQgEgEgLAAQgPAAgOAHIABgNQANgHARAAQAhAAAAAeIAAA9IgOAAIgBgNQgIAPgSAAQgMAAgIgHgAAQAAQgUAAgIAFQgHAFAAAJQAAAHAEAEQAFAEAHAAQAOAAAJgLIAAgYg");
	this.shape_29.setTransform(43.275,17.925);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#666666").s().p("AgQAoIAAhlQAGgDAJABIAABmQAAANAKAAQAFAAADgCQAAAGgCAHQgFABgGAAQgUAAAAgYg");
	this.shape_30.setTransform(36.975,16.15);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#666666").s().p("AgHBAIAAhZIAPAAIAABZgAgGguQgDgDAAgEQAAgFADgDQADgCADAAQAEAAADACQADADAAAFQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_31.setTransform(31.875,16);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#666666").s().p("AgaAoQgIgHAAgNQAAgPALgHQAMgIAbgCIAEAAIAAgDQAAgKgFgEQgEgEgLAAQgPAAgOAHIABgNQANgHARAAQAhAAAAAeIAAA9IgOAAIgBgNQgIAPgSAAQgMAAgIgHgAAQAAQgUAAgIAFQgHAFAAAJQAAAHAEAEQAFAEAHAAQAOAAAJgLIAAgYg");
	this.shape_32.setTransform(25.025,17.925);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#666666").s().p("AgHAtIghhZIARAAIAXBKIAZhKIAQAAIgiBZg");
	this.shape_33.setTransform(16.575,17.925);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#666666").s().p("AAhA/IgJggIgwAAIgJAgIgQAAIAnh6QAJgDAKAAIApB9gAAUARIgUg/IgUA/IAoAAg");
	this.shape_34.setTransform(7.2,16.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_level3, new cjs.Rectangle(0,0,301.9,30), null);


(lib.mc_level2_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgdAnQAAgHACgGQALAGANAAQARAAAAgLQAAgGgCgDQgDgCgIgDIgHgCQgWgGAAgSQAAgMAHgGQAJgGAOAAQAOAAAKAEIgCAMQgKgEgLAAQgRAAAAALQAAAJAOAFIAHACQAXAGAAARQAAALgJAHQgIAHgPAAQgQAAgLgFg");
	this.shape.setTransform(207,17.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgZAyQgJgLAAgVQAAgtAoABIAPABIAAghQAGgCAIAAIAAB3IgNAAIgBgLQgHANgPAAQgPAAgJgLgAgUARQAAAgAWAAQALAAAIgJIAAg1QgHgBgIAAQgaAAAAAfg");
	this.shape_1.setTransform(198.475,15.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgWArIAAhTIAOAAIAAAMQAIgOANAAIAKABQAAAHgCAGIgKgBQgLAAgHAIIAABAg");
	this.shape_2.setTransform(191.825,17);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgYAmQgIgHAAgMQAAgPAKgGQALgHAagCIAEAAIAAgEQAAgIgFgEQgEgEgJAAQgPAAgNAGIABgMQAMgGAQAAQAfAAAAAcIAAA5IgNAAIgBgLQgIANgQAAQgMAAgHgGgAAQAAQgTAAgIAFQgHAEAAAJQAAAHAEADQAEAFAIAAQANAAAIgLIAAgXg");
	this.shape_3.setTransform(183.775,17.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgRAhQgMgLAAgWQAAgVAMgLQAKgLASAAQALAAAIADIgCAMQgHgDgJAAQgMAAgHAJQgHAIAAAOQAAAPAHAJQAHAIAMAAQAKAAAIgEIgCAMQgHAEgLAAQgRAAgKgLg");
	this.shape_4.setTransform(176.075,17.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgUAdIAAhSQAGgCAJAAIAAAZIAaAAIgCANIgYAAIAAAtQAAAPAMAAQAHAAAGgDIgCANQgGADgIAAQgYAAAAgbg");
	this.shape_5.setTransform(166.3,15.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgGA9IAAhUIAOAAIAABUgAgGgrQgCgDAAgEQAAgEACgDQADgCADgBQAEABADACQACACAAAFQAAAEgCADQgDACgEAAQgDAAgDgCg");
	this.shape_6.setTransform(161.05,15.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgiA5IAAhzQAGgCAIAAIAAAuQAIgMAOAAQAPAAAJALQAJALAAAUQAAAtgoAAQgRAAgMgEgAgUgGIAAA1QAHACAIAAQAaAAAAghQAAgegWAAQgLAAgIAIg");
	this.shape_7.setTransform(154.775,15.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgZAgQgKgLAAgVQAAgTAJgLQAKgNARAAQASAAAIAKQAJAKAAASIgBAKIg2AAQACAbAYAAQAOAAAMgHIgCAOQgMAFgMAAQgVAAgLgMgAAVgGQAAgZgUAAQgTAAgBAZIAoAAIAAAAg");
	this.shape_8.setTransform(145.6,17.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgZAyQgJgLAAgVQAAgtAoABIAPABIAAghQAGgCAIAAIAAB3IgNAAIgBgLQgHANgPAAQgPAAgJgLgAgUARQAAAgAWAAQALAAAIgJIAAg1QgHgBgIAAQgaAAAAAfg");
	this.shape_9.setTransform(136.575,15.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgYAmQgIgHAAgMQAAgPAKgGQALgHAagCIAEAAIAAgEQAAgIgFgEQgEgEgJAAQgPAAgNAGIABgMQAMgGAQAAQAfAAAAAcIAAA5IgNAAIgBgLQgIANgQAAQgMAAgHgGgAAQAAQgTAAgIAFQgHAEAAAJQAAAHAEADQAEAFAIAAQANAAAIgLIAAgXg");
	this.shape_10.setTransform(124.175,17.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgcAnQAAgHACgGQAKAGANAAQARAAABgLQgBgGgDgDQgDgCgHgDIgHgCQgWgGAAgSQAAgMAIgGQAHgGAOAAQAOAAAMAEIgDAMQgLgEgLAAQgQAAAAALQAAAJAOAFIAIACQAVAGAAARQAAALgIAHQgJAHgOAAQgQAAgKgFg");
	this.shape_11.setTransform(116.5,17.075);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgGA9IAAhUIAOAAIAABUgAgGgrQgDgDAAgEQAAgEADgDQADgCADgBQAEABADACQADACgBAFQABAEgDADQgDACgEAAQgDAAgDgCg");
	this.shape_12.setTransform(110.75,15.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgHA7Igmh1IAQAAIAdBmIAfhmIAPAAIgmB1g");
	this.shape_13.setTransform(103.975,15.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgcAnQAAgHABgGQALAGANAAQARAAABgLQAAgGgEgDQgDgCgHgDIgHgCQgWgGAAgSQAAgMAIgGQAHgGAOAAQAOAAAMAEIgDAMQgLgEgLAAQgQAAAAALQAAAJAOAFIAIACQAWAGgBARQABALgJAHQgJAHgOAAQgQAAgKgFg");
	this.shape_14.setTransform(91.85,17.075);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgcAnQAAgHACgGQAKAGANAAQARAAAAgLQAAgGgDgDQgCgCgIgDIgHgCQgWgGAAgSQAAgMAHgGQAJgGANAAQAOAAAMAEIgDAMQgLgEgLAAQgQAAAAALQAAAJAOAFIAIACQAVAGAAARQAAALgIAHQgJAHgOAAQgQAAgKgFg");
	this.shape_15.setTransform(84.45,17.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgZAgQgKgLAAgVQAAgTAJgLQAKgNASAAQAQAAAKAKQAIAKAAASIgBAKIg2AAQACAbAZAAQANAAAMgHIgCAOQgMAFgMAAQgVAAgLgMgAAVgGQAAgZgUAAQgSAAgCAZIAoAAIAAAAg");
	this.shape_16.setTransform(76.35,17.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgPAmIAAhgQAGgCAIAAIAABhQAAAMAJAAQAFgBADgBIgCAMQgEACgGAAQgTAAAAgXg");
	this.shape_17.setTransform(70.225,15.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgUAdIAAhSQAHgCAIAAIAAAZIAaAAIgCANIgYAAIAAAtQAAAPAMAAQAHAAAGgDIgBANQgIADgHAAQgYAAAAgbg");
	this.shape_18.setTransform(64.9,15.925);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgRAhQgMgLAAgWQAAgVAMgLQAKgLASAAQALAAAIADIgCAMQgHgDgJAAQgMAAgHAJQgHAIAAAOQAAAPAHAJQAHAIAMAAQAKAAAIgEIgCAMQgHAEgLAAQgRAAgKgLg");
	this.shape_19.setTransform(57.975,17.075);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgYAmQgIgHAAgMQAAgPAKgGQALgHAagCIAEAAIAAgEQAAgIgFgEQgEgEgJAAQgPAAgNAGIABgMQAMgGAQAAQAfAAAAAcIAAA5IgNAAIgBgLQgIANgQAAQgMAAgHgGgAAQAAQgTAAgIAFQgHAEAAAJQAAAHAEADQAEAFAIAAQANAAAIgLIAAgXg");
	this.shape_20.setTransform(49.875,17.075);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgTAdIAAhSQAFgCAJAAIAAAZIAZAAIgBANIgYAAIAAAtQAAAPAMAAQAHAAAGgDIgCANQgGADgIAAQgYAAABgbg");
	this.shape_21.setTransform(43.35,15.925);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AASArIAAgzQAAgWgSAAQgKAAgIAJIAABAIgPAAIAAhTIAOAAIABANQAJgPAPAAQANAAAHAIQAIAHAAAOIAAA4g");
	this.shape_22.setTransform(35.6,16.975);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgcAgQgKgLAAgVQAAgUAKgLQALgMARAAQASAAALAMQAJALABAUQgBAVgJALQgLAMgSAAQgRAAgLgMgAgWAAQgBAgAXAAQAYAAgBggQABgfgYAAQgXAAABAfg");
	this.shape_23.setTransform(26.45,17.075);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgaAsQgNgQAAgcQAAgbAOgRQAOgQAYAAQARAAAKAFQAAAIgCAFQgKgFgOAAQgRAAgKAMQgLANABAWQgBAXALANQALAMARAAQAOAAALgGIgDAPQgLAEgMAAQgZAAgPgRg");
	this.shape_24.setTransform(17.35,15.425);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgLAMQgGgFAAgHQAAgGAGgFQAFgFAGAAQAIAAAFAFQAEAFAAAGQAAAHgEAFQgFAFgIAAQgGAAgFgFg");
	this.shape_25.setTransform(5.45,15.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_level2_3, new cjs.Rectangle(0,0,212.9,28.6), null);


(lib.mc_level2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgZAgQgKgLAAgVQAAgTAJgLQAKgNARAAQARAAAKAKQAIAKAAASIgBAKIg2AAQACAbAZAAQANAAAMgHIgCAOQgMAFgMAAQgVAAgLgMgAAVgGQAAgZgUAAQgSAAgCAZIAoAAIAAAAg");
	this.shape.setTransform(187.95,17.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRAhQgMgLAAgWQAAgVAMgLQAKgLASAAQALAAAIADIgCAMQgHgDgJAAQgMAAgHAJQgHAIAAAOQAAAPAHAJQAHAIAMAAQAKAAAIgEIgCAMQgHAEgLAAQgRAAgKgLg");
	this.shape_1.setTransform(180.025,17.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgGA9IAAhUIANAAIAABUgAgFgrQgEgDAAgEQAAgEAEgDQACgCADgBQAEABADACQACACAAAFQAAAEgCADQgDACgEAAQgDAAgCgCg");
	this.shape_2.setTransform(174.4,15.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgGAqIgfhTIAPAAIAWBFIAYhFIAOAAIgfBTg");
	this.shape_3.setTransform(168.425,17.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgWArIAAhTIAOAAIAAAMQAIgOANAAIAKABQAAAHgCAGIgKgBQgLAAgHAIIAABAg");
	this.shape_4.setTransform(162.075,17);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgZAgQgKgLAAgVQAAgTAJgLQAKgNARAAQASAAAIAKQAJAKAAASIgBAKIg3AAQADAbAYAAQAOAAAMgHIgCAOQgMAFgMAAQgVAAgLgMgAAVgGQAAgZgUAAQgTAAgCAZIApAAIAAAAg");
	this.shape_5.setTransform(154.15,17.075);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgdAnQAAgHACgGQALAGANAAQARAAAAgLQAAgGgCgDQgDgCgIgDIgHgCQgWgGAAgSQAAgMAHgGQAJgGAOAAQAOAAAKAEIgCAMQgKgEgLAAQgRAAAAALQAAAJAOAFIAHACQAXAGAAARQAAALgJAHQgIAHgPAAQgQAAgLgFg");
	this.shape_6.setTransform(146.25,17.075);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgZAgQgKgLAAgVQAAgTAJgLQAKgNARAAQARAAAKAKQAIAKAAASIgBAKIg2AAQACAbAZAAQANAAAMgHIgCAOQgMAFgMAAQgVAAgLgMgAAVgGQAAgZgUAAQgTAAgBAZIAoAAIAAAAg");
	this.shape_7.setTransform(134.5,17.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgcA5IACgNQAKAGAMAAQAZAAAAgZIAAgLQgIAMgOAAQgPAAgJgKQgJgMAAgUQAAgtAoAAQARAAAMAFIAABPQAAAngmAAQgOAAgLgFgAgUgRQAAAfAWAAQALAAAIgIIAAg1QgHgCgIAAQgaAAAAAgg");
	this.shape_8.setTransform(125.475,18.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AASArIAAgzQABgWgTAAQgKAAgIAJIAABAIgPAAIAAhTIAOAAIABANQAJgPAPAAQAOAAAGAIQAIAHAAAOIAAA4g");
	this.shape_9.setTransform(116.7,16.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgYAmQgIgHAAgMQAAgPAKgGQALgHAagCIAEAAIAAgEQAAgIgFgEQgEgEgJAAQgPAAgNAGIABgMQAMgGAQAAQAfAAAAAcIAAA5IgNAAIgBgLQgIANgQAAQgMAAgHgGgAAQAAQgTAAgIAFQgHAEAAAJQAAAHAEADQAEAFAIAAQANAAAIgLIAAgXg");
	this.shape_10.setTransform(107.575,17.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AASA8IAAg1QAAgUgSAAQgKAAgIAJIAABAIgPAAIAAh1QAGgCAJAAIAAAwQAJgOAPAAQANAAAHAHQAIAIAAANIAAA5g");
	this.shape_11.setTransform(99.05,15.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgRAhQgMgLAAgWQAAgVAMgLQAKgLASAAQALAAAIADQAAAGgCAGQgHgDgJAAQgMAAgHAJQgHAIAAAOQAAAPAHAJQAHAIAMAAQAKAAAIgEIgCAMQgHAEgLAAQgRAAgKgLg");
	this.shape_12.setTransform(90.725,17.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AAVAqIgVgeIgUAeIgRAAIAegpIgdgqIARAAIATAfIAVgfIAQAAIgdApIAeAqg");
	this.shape_13.setTransform(83.175,17.075);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AghA7IAAh1IBDAAIgCAOIgyAAIAAAlIAtAAIgBANIgsAAIAAAnIA0AAIgCAOg");
	this.shape_14.setTransform(75.2,15.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AATArIAAgzQAAgWgSAAQgKAAgJAJIAABAIgOAAIAAhTIANAAIAAANQAKgPAPAAQANAAAIAIQAGAHAAAOIAAA4g");
	this.shape_15.setTransform(62.2,16.975);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgcA5IACgNQAKAGAMAAQAZAAAAgZIAAgLQgIAMgOAAQgPAAgJgKQgJgMAAgUQAAgtAoAAQARAAAMAFIAABPQAAAngmAAQgOAAgLgFgAgUgRQAAAfAWAAQALAAAIgIIAAg1QgHgCgIAAQgaAAAAAgg");
	this.shape_16.setTransform(52.775,18.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgGA9IAAhUIAOAAIAABUgAgGgrQgDgDAAgEQAAgEADgDQADgCADgBQAEABADACQADACgBAFQABAEgDADQgDACgEAAQgDAAgDgCg");
	this.shape_17.setTransform(46.5,15.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgYAgQgLgLAAgVQAAgTAJgLQAKgNASAAQAQAAAKAKQAIAKAAASIgBAKIg3AAQADAbAYAAQAOAAAMgHIgCAOQgMAFgNAAQgUAAgKgMgAAVgGQAAgZgUAAQgTAAgCAZIApAAIAAAAg");
	this.shape_18.setTransform(40.15,17.075);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgWArIAAhTIAOAAIAAAMQAIgOANAAIAKABQAAAHgCAGIgKgBQgLAAgHAIIAABAg");
	this.shape_19.setTransform(33.525,17);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgcAgQgKgLABgVQgBgUAKgLQAKgMASAAQATAAAJAMQALALAAAUQAAAVgLALQgJAMgTAAQgRAAgLgMgAgWAAQAAAgAWAAQAYAAAAggQAAgfgYAAQgWAAAAAfg");
	this.shape_20.setTransform(25.45,17.075);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgfA7IAAh1IA/AAIgBAOIgvAAIAAAlIAsAAIgBANIgrAAIAAA1g");
	this.shape_21.setTransform(17.25,15.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgLAMQgGgFAAgHQAAgGAGgFQAFgFAGAAQAIAAAFAFQAEAFAAAGQAAAHgEAFQgFAFgIAAQgGAAgFgFg");
	this.shape_22.setTransform(5.45,15.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_level2_2, new cjs.Rectangle(0,0,194.5,28.6), null);


(lib.mc_level2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgfA8IABgMIAFABQAHAAAFgFQAFgEAEgMIgihYIAPAAIAYBGIAYhGIAPAAIgiBeQgIAbgWAAIgHgBg");
	this.shape.setTransform(245.4,18.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgZAgQgKgLAAgVQAAgTAJgLQAKgNARAAQASAAAIAKQAJAKAAASIgBAKIg3AAQADAbAYAAQAOAAAMgHIgCAOQgMAFgNAAQgUAAgLgMgAAVgGQAAgZgUAAQgTAAgCAZIApAAIAAAAg");
	this.shape_1.setTransform(236.95,17.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AASArIAAgzQAAgWgSAAQgKAAgIAJIAABAIgPAAIAAhTIAOAAIABANQAJgPAPAAQANAAAHAIQAIAHAAAOIAAA4g");
	this.shape_2.setTransform(228.2,16.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgcAgQgKgLAAgVQAAgUAKgLQALgMARAAQASAAALAMQAJALABAUQgBAVgJALQgLAMgSAAQgRAAgLgMgAgWAAQgBAgAXAAQAYAAgBggQABgfgYAAQgXAAABAfg");
	this.shape_3.setTransform(219.05,17.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAtArIAAg0QAAgVgSAAQgKAAgKAJIABAIIAAA4IgPAAIAAgzQAAgWgSAAQgLAAgIAJIAABAIgPAAIAAhTIAOAAIABANQAJgPAQAAQATAAAFAPQAKgPASAAQANAAAHAIQAHAHAAAOIAAA4g");
	this.shape_4.setTransform(207.4,16.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgWArIAAhTIAOAAIAAAMQAIgOANAAIAKABQAAAHgCAGIgKgBQgLAAgHAIIAABAg");
	this.shape_5.setTransform(194.125,17);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgZAjQgIgHABgOIAAg4IAOAAIAAA0QAAAVASAAQALAAAIgJIAAhAIAOAAIAABTIgNAAIgBgNQgIAPgQAAQgOAAgGgIg");
	this.shape_6.setTransform(185.95,17.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgbAgQgLgLABgVQgBgUALgLQAKgMARAAQASAAAKAMQAKALAAAUQAAAVgKALQgKAMgSAAQgRAAgKgMgAgXAAQAAAgAXAAQAXAAABggQgBgfgXAAQgXAAAAAfg");
	this.shape_7.setTransform(176.9,17.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgfA8IAAgMIAGABQAIAAAEgFQAFgEAEgMIgjhYIAQAAIAZBGIAXhGIAPAAIgiBeQgJAbgUAAIgIgBg");
	this.shape_8.setTransform(168.3,18.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgcAgQgKgLAAgVQAAgUAKgLQALgMARAAQASAAALAMQAJALABAUQgBAVgJALQgLAMgSAAQgRAAgLgMgAgWAAQgBAgAXAAQAYAAgBggQABgfgYAAQgXAAABAfg");
	this.shape_9.setTransform(156.05,17.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgUAdIAAhSQAHgCAIAAIAAAZIAaAAIgCANIgYAAIAAAtQAAAPAMAAQAHAAAGgDIgBANQgIADgHAAQgYAAAAgbg");
	this.shape_10.setTransform(149.05,15.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgdAnQAAgHACgGQALAGANAAQASAAgBgLQAAgGgCgDQgEgCgHgDIgHgCQgWgGAAgSQAAgMAHgGQAIgGAPAAQAOAAAKAEIgCAMQgLgEgKAAQgRAAAAALQAAAJAOAFIAHACQAXAGAAARQAAALgJAHQgIAHgPAAQgQAAgLgFg");
	this.shape_11.setTransform(138.5,17.075);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgcAnQAAgHABgGQALAGANAAQASAAAAgLQAAgGgEgDQgDgCgHgDIgHgCQgWgGAAgSQAAgMAIgGQAHgGAOAAQAOAAALAEIgCAMQgKgEgMAAQgQAAAAALQAAAJAOAFIAHACQAXAGgBARQABALgJAHQgJAHgOAAQgQAAgKgFg");
	this.shape_12.setTransform(131.1,17.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgZAgQgKgLAAgVQAAgTAJgLQAKgNARAAQASAAAIAKQAJAKAAASIgBAKIg2AAQACAbAZAAQANAAAMgHIgCAOQgMAFgMAAQgVAAgLgMgAAVgGQAAgZgUAAQgTAAgBAZIAoAAIAAAAg");
	this.shape_13.setTransform(123,17.075);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgRAhQgMgLAAgWQAAgVAMgLQAKgLASAAQALAAAIADIgCAMQgHgDgJAAQgMAAgHAJQgHAIAAAOQAAAPAHAJQAHAIAMAAQAKAAAIgEIgCAMQgHAEgLAAQgRAAgKgLg");
	this.shape_14.setTransform(115.075,17.075);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgRAhQgMgLAAgWQAAgVAMgLQAKgLASAAQALAAAIADIgCAMQgHgDgJAAQgMAAgHAJQgHAIAAAOQAAAPAHAJQAHAIAMAAQAKAAAIgEIgCAMQgHAEgLAAQgRAAgKgLg");
	this.shape_15.setTransform(107.775,17.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgYAmQgIgHAAgMQAAgPAKgGQALgHAagCIAEAAIAAgEQAAgIgFgEQgEgEgJAAQgPAAgNAGIABgMQAMgGAQAAQAfAAAAAcIAAA5IgNAAIgBgLQgIANgQAAQgMAAgHgGgAAQAAQgTAAgIAFQgHAEAAAJQAAAHAEADQAEAFAIAAQANAAAIgLIAAgXg");
	this.shape_16.setTransform(99.675,17.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgYAgQgLgLAAgVQAAgTAJgLQAKgNASAAQARAAAIAKQAJAKAAASIgBAKIg3AAQADAbAYAAQAOAAAMgHIgCAOQgMAFgNAAQgUAAgKgMgAAVgGQAAgZgUAAQgSAAgDAZIApAAIAAAAg");
	this.shape_17.setTransform(87.65,17.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgZAyQgJgLAAgVQAAgtAoABIAPABIAAghQAGgCAIAAIAAB3IgNAAIgBgLQgHANgPAAQgPAAgJgLgAgUARQAAAgAWAAQALAAAIgJIAAg1QgHgBgIAAQgaAAAAAfg");
	this.shape_18.setTransform(78.625,15.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgGA9IAAhUIANAAIAABUgAgFgrQgEgDAAgEQAAgEAEgDQACgCADgBQAEABADACQACACAAAFQAAAEgCADQgDACgEAAQgDAAgCgCg");
	this.shape_19.setTransform(72.35,15.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AAVAqIgUg/IgWA/IgNAAIgdhTIAPAAIAWBDIAUhDIANAAIAWBEIAUhEIAPAAIgcBTg");
	this.shape_20.setTransform(63.75,17.075);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgZAyQgJgLAAgVQAAgtAoABIAPABIAAghQAGgCAIAAIAAB3IgNAAIgBgLQgHANgPAAQgPAAgJgLgAgUARQAAAgAWAAQALAAAIgJIAAg1QgHgBgIAAQgaAAAAAfg");
	this.shape_21.setTransform(52.375,15.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgPAmIAAhgQAGgCAIAAIAABhQAAAMAJAAQAFgBADgBIgCAMQgEACgGAAQgTAAAAgXg");
	this.shape_22.setTransform(46.225,15.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgWArIAAhTIAOAAIAAAMQAIgOANAAIAKABQAAAHgCAGIgKgBQgLAAgHAIIAABAg");
	this.shape_23.setTransform(41.025,17);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgcAgQgJgLgBgVQABgUAJgLQALgMARAAQASAAALAMQAKALAAAUQAAAVgKALQgLAMgSAAQgRAAgLgMgAgWAAQgBAgAXAAQAYAAgBggQABgfgYAAQgXAAABAfg");
	this.shape_24.setTransform(32.95,17.075);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAYA7IgYhcIgXBcIgSAAIgih1IAQAAIAbBmIAahmIANAAIAbBlIAahlIAQAAIgiB1g");
	this.shape_25.setTransform(20.5,15.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgLAMQgGgFAAgHQAAgGAGgFQAFgFAGAAQAIAAAFAFQAEAFAAAGQAAAHgEAFQgFAFgIAAQgGAAgFgFg");
	this.shape_26.setTransform(5.45,15.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_level2_1, new cjs.Rectangle(0,0,251.7,28.6), null);


(lib.mc_level1_728_animated = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_420 = function() {
		if (!this.looped) this.looped = 1;
		if (this.looped++ == 1) this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(420).call(this.frame_420).wait(1));

	// t
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EC0000").s().p("AgyBMIAAjSQAPgGAWAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQAQAAAPgIIgEAgQgPAHgUAAQg9AAAAhBg");
	this.shape.setTransform(650.25,37.125);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(29).to({_off:false},0).wait(392));

	// n
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EC0000").s().p("AAvBtIAAiJQAAgagMgMQgMgMgbAAQgUAAgWAGIAAC1IglAAIAAjMQAsgNAkAAQBXAAAABLIAACOg");
	this.shape_1.setTransform(631.7,39.825);
	this.shape_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(28).to({_off:false},0).wait(393));

	// u
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EC0000").s().p("AhTAiIAAiOIAlAAIAACJQAAAaALAMQANAMAbAAQATAAAXgFIAAi2IAlAAIAADMQgsANgkAAQhXAAAAhLg");
	this.shape_2.setTransform(609.425,40.325);
	this.shape_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(27).to({_off:false},0).wait(394));

	// o
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EC0000").s().p("AhGBSQgZgdAAg1QAAgzAZgeQAZgeAtAAQAuAAAaAeQAYAeAAAzQAAA1gZAdQgZAeguAAQgtAAgZgegAg5AAQAABRA5AAQA7AAAAhRQAAhQg7AAQg5AAAABQg");
	this.shape_3.setTransform(587.575,40.075);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(26).to({_off:false},0).wait(395));

	// c
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EC0000").s().p("AguBUQgbgdAAg3QAAg0AZgdQAageAxAAQAdAAASAJQAAAOgDAQQgTgHgYAAQg/AAAABQQAAAmARAVQARAVAeAAQAZAAAUgLQgBARgEAPQgRAKgbAAQgsAAgbgcg");
	this.shape_4.setTransform(567.975,40.075);
	this.shape_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(25).to({_off:false},0).wait(396));

	// c
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EC0000").s().p("AguBUQgbgdAAg3QAAg0AZgdQAageAxAAQAdAAASAJQAAAOgDAQQgTgHgYAAQg/AAAABQQAAAmARAVQARAVAeAAQAZAAAUgLQgBARgEAPQgRAKgbAAQgsAAgbgcg");
	this.shape_5.setTransform(550.575,40.075);
	this.shape_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(24).to({_off:false},0).wait(397));

	// a
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EC0000").s().p("Ag/BVQgYgcAAg4QAAhwBmAAQAoAAAgAMIAADOIghAAIgDgdQgSAiglAAQgnAAgUgbgAgxAAQABBRA1AAQAbAAASgUIAAiJQgRgEgTAAQg/AAAABQg");
	this.shape_6.setTransform(530.3,40.075);
	this.shape_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(23).to({_off:false},0).wait(398));

	// y
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EC0000").s().p("AhPCYQAAgTACgLIANABQATAAAMgLQAMgMAJgeIhWjgIAnAAIA/CyIA5iyIAmAAIhUDwQgXBFg0AAQgKAAgJgDg");
	this.shape_7.setTransform(501.875,44.9);
	this.shape_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(22).to({_off:false},0).wait(399));

	// a
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EC0000").s().p("AhABVQgWgcAAg4QAAhwBlAAQAoAAAgAMIAADOIgiAAIgCgdQgSAigkAAQgnAAgWgbgAgwAAQgBBRA2AAQAbAAASgUIAAiJQgQgEgUAAQg+AAAABQg");
	this.shape_8.setTransform(480.5,40.075);
	this.shape_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(21).to({_off:false},0).wait(400));

	// d
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EC0000").s().p("AhAB/QgYgdAAg2QAAhwBngBQAUABARACIAAhSQAQgFAVAAIAAEuIgiAAIgDgdQgSAiglAAQgnAAgWgbgAgyArQAABRA4AAQAbgBATgUIAAiIQgRgFgUAAQhBAAAABRg");
	this.shape_9.setTransform(458.575,35.85);
	this.shape_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(20).to({_off:false},0).wait(401));

	// y
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EC0000").s().p("AhPCYQAAgTACgLIANABQATAAAMgLQAMgMAJgeIhWjgIAnAAIA/CyIA5iyIAmAAIhUDwQgXBFg0AAQgKAAgJgDg");
	this.shape_10.setTransform(438.475,44.9);
	this.shape_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(19).to({_off:false},0).wait(402));

	// r
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#EC0000").s().p("Ag4BtIAAjNQAhgMAkAAQAaAAASAEQAAAUgEAMQgPgEgYAAQgPAAgSAEIAAC1g");
	this.shape_11.setTransform(422.375,39.875);
	this.shape_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(18).to({_off:false},0).wait(403));

	// e
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EC0000").s().p("Ag/BSQgagdAAg2QAAgxAWgdQAaggAsAAQAsAAAWAbQAVAZAAAsIgCAbIiLAAQAGBFBAAAQAiAAAegRQgCAUgEANQgYAPgmAAQg0AAgagegAA0gRQAAg/gyAAQguAAgGA/IBmAAIAAAAg");
	this.shape_12.setTransform(403.15,40.075);
	this.shape_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(17).to({_off:false},0).wait(404));

	// v
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EC0000").s().p("AgRBrIhNjVIAnAAIA4CsIA5isIAlAAIhNDVg");
	this.shape_13.setTransform(383.425,40.075);
	this.shape_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(16).to({_off:false},0).wait(405));

	// e
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EC0000").s().p("Ag/BSQgagdAAg2QAAgxAXgdQAYggAtAAQAsAAAWAbQAVAZAAAsIgCAbIiLAAQAGBFBAAAQAiAAAegRQgCAUgEANQgYAPgmAAQg0AAgagegAA0gRQgBg/gxAAQgvAAgFA/IBmAAIAAAAg");
	this.shape_14.setTransform(363.2,40.075);
	this.shape_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(15).to({_off:false},0).wait(406));

	// r
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EC0000").s().p("Ag4BtIAAjNQAhgMAkAAQAaAAASAEQAAAUgEAMQgPgEgYAAQgPAAgSAEIAAC1g");
	this.shape_15.setTransform(338.225,39.875);
	this.shape_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(14).to({_off:false},0).wait(407));

	// u
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#EC0000").s().p("AhTAiIAAiOIAlAAIAACJQAAAaALAMQANAMAbAAQATAAAXgFIAAi2IAlAAIAADMQgsANgkAAQhXAAAAhLg");
	this.shape_16.setTransform(318.675,40.325);
	this.shape_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(13).to({_off:false},0).wait(408));

	// o
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#EC0000").s().p("AhGBSQgZgdAAg1QAAgzAZgeQAZgeAtAAQAuAAAaAeQAYAeAAAzQAAA1gZAdQgZAeguAAQgtAAgZgegAg5AAQAABRA5AAQA7AAAAhRQAAhQg7AAQg5AAAABQg");
	this.shape_17.setTransform(296.825,40.075);
	this.shape_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(12).to({_off:false},0).wait(409));

	// y
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#EC0000").s().p("AhPCYQAAgTACgLIANABQATAAAMgLQAMgMAJgeIhWjgIAnAAIA/CyIA5iyIAmAAIhUDwQgXBFg0AAQgKAAgJgDg");
	this.shape_18.setTransform(276.125,44.9);
	this.shape_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(11).to({_off:false},0).wait(410));

	// m
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#EC0000").s().p("ABwBtIAAiJQAAgagMgMQgMgMgaAAQgaAAgXANQAGAOAAASIAACOIgkAAIAAiJQAAgagMgMQgMgMgcAAQgUAAgWAGIAAC1IglAAIAAjMQArgNAlAAQAvAAAVAUQAbgUAsAAQBOAAAABKIAACPg");
	this.shape_19.setTransform(240.475,39.825);
	this.shape_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(10).to({_off:false},0).wait(411));

	// o
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#EC0000").s().p("AhGBSQgZgdAAg1QAAgzAZgeQAZgeAtAAQAuAAAaAeQAYAeAAAzQAAA1gZAdQgZAeguAAQgtAAgZgegAg5AAQAABRA5AAQA7AAAAhRQAAhQg7AAQg5AAAABQg");
	this.shape_20.setTransform(211.875,40.075);
	this.shape_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(9).to({_off:false},0).wait(412));

	// r
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#EC0000").s().p("Ag4BtIAAjNQAhgMAkAAQAaAAASAEQAAAUgEAMQgPgEgYAAQgPAAgSAEIAAC1g");
	this.shape_21.setTransform(194.675,39.875);
	this.shape_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(8).to({_off:false},0).wait(413));

	// f
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#EC0000").s().p("Ag3CYIAAjmQAAhJBKAAQAWAAAPAEIgDAgQgRgFgOAAQgWAAgJAKQgJALAAAWIAAARIBEAAIgEAfIhAAAIAAC1g");
	this.shape_22.setTransform(181.175,35.55);
	this.shape_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_22).wait(7).to({_off:false},0).wait(414));

	// e
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#EC0000").s().p("Ag/BSQgagdAAg2QAAgxAXgdQAZggAtAAQArAAAWAbQAVAZAAAsIgCAbIiLAAQAGBFBAAAQAiAAAegRQgCAUgEANQgYAPgmAAQgzAAgbgegAA0gRQgBg/gxAAQgvAAgFA/IBmAAIAAAAg");
	this.shape_23.setTransform(153.6,40.075);
	this.shape_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(6).to({_off:false},0).wait(415));

	// r
	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#EC0000").s().p("Ag4BtIAAjNQAhgMAkAAQAaAAASAEQAAAUgEAMQgPgEgYAAQgPAAgSAEIAAC1g");
	this.shape_24.setTransform(137.025,39.875);
	this.shape_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_24).wait(5).to({_off:false},0).wait(416));

	// o
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#EC0000").s().p("AhGBSQgZgdAAg1QAAgzAZgeQAZgeAtAAQAuAAAaAeQAYAeAAAzQAAA1gZAdQgZAeguAAQgtAAgZgegAg5AAQAABRA5AAQA7AAAAhRQAAhQg7AAQg5AAAABQg");
	this.shape_25.setTransform(117.675,40.075);
	this.shape_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_25).wait(4).to({_off:false},0).wait(417));

	// m
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#EC0000").s().p("ABwBtIAAiJQAAgagMgMQgMgMgaAAQgaAAgXANQAGAOAAASIAACOIgkAAIAAiJQAAgagMgMQgMgMgcAAQgUAAgWAGIAAC1IglAAIAAjMQArgNAlAAQAvAAAVAUQAbgUAsAAQBOAAAABKIAACPg");
	this.shape_26.setTransform(89.325,39.825);
	this.shape_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_26).wait(3).to({_off:false},0).wait(418));

	// t
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#EC0000").s().p("AgyBMIAAjSQAQgGAVAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAPgIIgFAgQgPAHgUAAQg9AAAAhBg");
	this.shape_27.setTransform(56.85,37.125);
	this.shape_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_27).wait(2).to({_off:false},0).wait(419));

	// e
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#EC0000").s().p("Ag/BSQgagdAAg2QAAgxAXgdQAZggAtAAQArAAAWAbQAVAZAAAsIgCAbIiLAAQAGBFBAAAQAiAAAegRQgCAUgEANQgYAPgmAAQgzAAgbgegAA0gRQgBg/gxAAQgvAAgFA/IBmAAIAAAAg");
	this.shape_28.setTransform(38.4,40.075);
	this.shape_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_28).wait(1).to({_off:false},0).wait(420));

	// G
	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#EC0000").s().p("AhLBwQgigpAAhHQAAhKAlgoQAlgoBEAAQAsAAAfANQgBAOgFAUQgggOglAAQgxAAgbAfQgbAfAAA7QAAA5AZAgQAbAgAuAAQAXAAAVgFIAAh3IAmAAIAACOQgkAQgvAAQhCAAgkgrg");
	this.shape_29.setTransform(14.55,35.875);

	this.timeline.addTween(cjs.Tween.get(this.shape_29).wait(421));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,658.9,66.1);


(lib.mc_background = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EC0000").s().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	this.shape.setTransform(364,45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_background, new cjs.Rectangle(0,0,728,90), null);


(lib.Logo_SantanderInternationalpos = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EC0000").s().p("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");
	this.shape.setTransform(150,45.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Logo_SantanderInternationalpos, new cjs.Rectangle(0,0,300,90.3), null);


(lib.Logo_SantanderInternationalneg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(150,45.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Logo_SantanderInternationalneg, new cjs.Rectangle(0,0,300,90.3), null);


// stage content:
(lib._728x90 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,319];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_319 = function() {
		if (!this.looped) this.looped = 1;
		if (this.looped++ == 2) this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(319).call(this.frame_319).wait(102));

	// border
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#EC0000").ss(2,1,1).p("Eg4tgG3MBxbAAAIAANvMhxbAAAg");
	this.shape.setTransform(363.9862,45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.004)").s().p("Eg4tAG4IAAtvMBxbAAAIAANvg");
	this.shape_1.setTransform(363.9862,45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(421));

	// background_colour_copy (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_1 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_2 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_3 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_4 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_5 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_6 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_7 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_8 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_9 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_10 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_11 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_12 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_13 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_14 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_15 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_16 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_17 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_18 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_19 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_20 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_21 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_22 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_23 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_24 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_25 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_26 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_27 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_28 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_29 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_30 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_31 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_32 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_33 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_34 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_35 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_36 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_37 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_38 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_39 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_40 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_41 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_42 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_43 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_44 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_45 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_46 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_47 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_48 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_49 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_50 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_51 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_52 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_53 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_54 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_55 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_56 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_57 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_58 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_59 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_60 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_61 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_62 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_63 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_64 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_65 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_66 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_67 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_68 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_69 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_70 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_71 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_72 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_73 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_74 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_75 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_76 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_77 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_78 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_79 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_80 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_81 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_82 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_83 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_84 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_85 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_86 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_87 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_88 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_89 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_90 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_91 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_92 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_93 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_94 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_95 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_96 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_97 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_98 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_99 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_100 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_101 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_102 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_103 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_104 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_105 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_106 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_107 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_108 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_109 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_110 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_111 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_112 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_113 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_114 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_115 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_116 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_117 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_118 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_119 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_120 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_121 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_122 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_123 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_124 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_125 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_126 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_127 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_128 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_129 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_130 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_131 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_132 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_133 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_134 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_135 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_136 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_137 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_138 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_139 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_140 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_141 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_142 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_143 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_144 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_145 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_146 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_147 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_148 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_149 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_150 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_151 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_152 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_153 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_154 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_155 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_156 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_157 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_158 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_159 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_160 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_161 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_162 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_163 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_164 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_165 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_166 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_167 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_168 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_169 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_170 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_171 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_172 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_173 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_174 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_175 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_176 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_177 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_178 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_179 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_180 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_181 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_182 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_183 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_184 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_185 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_186 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_187 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_188 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_189 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_190 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_191 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_192 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_193 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_194 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_195 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_196 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_197 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_198 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_199 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_200 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_201 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_202 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_203 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_204 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_205 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_206 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_207 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_208 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_209 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_210 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_211 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_212 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_213 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_214 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_215 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_216 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_217 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_218 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_219 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_220 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_221 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_222 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_223 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_224 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_225 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_226 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_227 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_228 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_229 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_230 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_231 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_232 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_233 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_234 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_235 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_236 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_237 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_238 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_239 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_240 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_241 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_242 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_243 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_244 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_245 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_246 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_247 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_248 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_249 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_250 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_251 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_252 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_253 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_254 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_255 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_256 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_257 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_258 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_259 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_260 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_261 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_262 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_263 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_264 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_265 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_266 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_267 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_268 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_269 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_270 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_271 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_272 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_273 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_274 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_275 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_276 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_277 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_278 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_279 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_280 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_281 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_282 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_283 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_284 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_285 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_286 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_287 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_288 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_289 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_290 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_291 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_292 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_293 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_294 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_295 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_296 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_297 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_298 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_299 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_300 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_301 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_302 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_303 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_304 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_305 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_306 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_307 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_308 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_309 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_310 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_311 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_312 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_313 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_314 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_315 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_316 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_317 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_318 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_319 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_320 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_321 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_322 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_323 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_324 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_325 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_326 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_327 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_328 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_329 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_330 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_331 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_332 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_333 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_334 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_335 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_336 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_337 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_338 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_339 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_340 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_341 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_342 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_343 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_344 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_345 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_346 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_347 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_348 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_349 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_350 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_351 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_352 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_353 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_354 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_355 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_356 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_357 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_358 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_359 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_360 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_361 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_362 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_363 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_364 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_365 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_366 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_367 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_368 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_369 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_370 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_371 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_372 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_373 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_374 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_375 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_376 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_377 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_378 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_379 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_380 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_381 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_382 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_383 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_384 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_385 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_386 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_387 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_388 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_389 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_390 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_391 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_392 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_393 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_394 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_395 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_396 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_397 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_398 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_399 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_400 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_401 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_402 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_403 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_404 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_405 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_406 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_407 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_408 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_409 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_410 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_411 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_412 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_413 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_414 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_415 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_416 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_417 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_418 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_419 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	var mask_graphics_420 = new cjs.Graphics().p("Eg43AHCIAAuDMBxvAAAIAAODg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:364,y:45}).wait(1).to({graphics:mask_graphics_1,x:364,y:45}).wait(1).to({graphics:mask_graphics_2,x:364,y:44.95}).wait(1).to({graphics:mask_graphics_3,x:364,y:44.8}).wait(1).to({graphics:mask_graphics_4,x:364,y:44.45}).wait(1).to({graphics:mask_graphics_5,x:364,y:43.65}).wait(1).to({graphics:mask_graphics_6,x:364,y:42.2}).wait(1).to({graphics:mask_graphics_7,x:364,y:39.8}).wait(1).to({graphics:mask_graphics_8,x:364,y:36.1}).wait(1).to({graphics:mask_graphics_9,x:364,y:30.75}).wait(1).to({graphics:mask_graphics_10,x:364,y:23.3}).wait(1).to({graphics:mask_graphics_11,x:364,y:13.25}).wait(1).to({graphics:mask_graphics_12,x:364,y:0}).wait(1).to({graphics:mask_graphics_13,x:364,y:-13.25}).wait(1).to({graphics:mask_graphics_14,x:364,y:-23.3}).wait(1).to({graphics:mask_graphics_15,x:364,y:-30.75}).wait(1).to({graphics:mask_graphics_16,x:364,y:-36.1}).wait(1).to({graphics:mask_graphics_17,x:364,y:-39.8}).wait(1).to({graphics:mask_graphics_18,x:364,y:-42.2}).wait(1).to({graphics:mask_graphics_19,x:364,y:-43.65}).wait(1).to({graphics:mask_graphics_20,x:364,y:-44.45}).wait(1).to({graphics:mask_graphics_21,x:364,y:-44.8}).wait(1).to({graphics:mask_graphics_22,x:364,y:-44.95}).wait(1).to({graphics:mask_graphics_23,x:364,y:-45}).wait(1).to({graphics:mask_graphics_24,x:364,y:-45}).wait(1).to({graphics:mask_graphics_25,x:364,y:-45}).wait(1).to({graphics:mask_graphics_26,x:364,y:-45}).wait(1).to({graphics:mask_graphics_27,x:364,y:-45}).wait(1).to({graphics:mask_graphics_28,x:364,y:-45}).wait(1).to({graphics:mask_graphics_29,x:364,y:-45}).wait(1).to({graphics:mask_graphics_30,x:364,y:-45}).wait(1).to({graphics:mask_graphics_31,x:364,y:-45}).wait(1).to({graphics:mask_graphics_32,x:364,y:-45}).wait(1).to({graphics:mask_graphics_33,x:364,y:-45}).wait(1).to({graphics:mask_graphics_34,x:364,y:-45}).wait(1).to({graphics:mask_graphics_35,x:364,y:-45}).wait(1).to({graphics:mask_graphics_36,x:364,y:-45}).wait(1).to({graphics:mask_graphics_37,x:364,y:-45}).wait(1).to({graphics:mask_graphics_38,x:364,y:-45}).wait(1).to({graphics:mask_graphics_39,x:364,y:-45}).wait(1).to({graphics:mask_graphics_40,x:364,y:-45}).wait(1).to({graphics:mask_graphics_41,x:364,y:-45}).wait(1).to({graphics:mask_graphics_42,x:364,y:-45}).wait(1).to({graphics:mask_graphics_43,x:364,y:-45}).wait(1).to({graphics:mask_graphics_44,x:364,y:-45}).wait(1).to({graphics:mask_graphics_45,x:364,y:-45}).wait(1).to({graphics:mask_graphics_46,x:364,y:-45}).wait(1).to({graphics:mask_graphics_47,x:364,y:-45}).wait(1).to({graphics:mask_graphics_48,x:364,y:-45}).wait(1).to({graphics:mask_graphics_49,x:364,y:-45}).wait(1).to({graphics:mask_graphics_50,x:364,y:-45}).wait(1).to({graphics:mask_graphics_51,x:364,y:-45}).wait(1).to({graphics:mask_graphics_52,x:364,y:-45}).wait(1).to({graphics:mask_graphics_53,x:364,y:-45}).wait(1).to({graphics:mask_graphics_54,x:364,y:-45}).wait(1).to({graphics:mask_graphics_55,x:364,y:-45}).wait(1).to({graphics:mask_graphics_56,x:364,y:-45}).wait(1).to({graphics:mask_graphics_57,x:364,y:-45}).wait(1).to({graphics:mask_graphics_58,x:364,y:-45}).wait(1).to({graphics:mask_graphics_59,x:364,y:-45}).wait(1).to({graphics:mask_graphics_60,x:364,y:-45}).wait(1).to({graphics:mask_graphics_61,x:364,y:-45}).wait(1).to({graphics:mask_graphics_62,x:364,y:-45}).wait(1).to({graphics:mask_graphics_63,x:364,y:-45}).wait(1).to({graphics:mask_graphics_64,x:364,y:-45}).wait(1).to({graphics:mask_graphics_65,x:364,y:-45}).wait(1).to({graphics:mask_graphics_66,x:364,y:-45}).wait(1).to({graphics:mask_graphics_67,x:364,y:-45}).wait(1).to({graphics:mask_graphics_68,x:364,y:-45}).wait(1).to({graphics:mask_graphics_69,x:364,y:-45}).wait(1).to({graphics:mask_graphics_70,x:364,y:-45}).wait(1).to({graphics:mask_graphics_71,x:364,y:-45}).wait(1).to({graphics:mask_graphics_72,x:364,y:-45}).wait(1).to({graphics:mask_graphics_73,x:364,y:-45}).wait(1).to({graphics:mask_graphics_74,x:364,y:-45}).wait(1).to({graphics:mask_graphics_75,x:364,y:-45}).wait(1).to({graphics:mask_graphics_76,x:364,y:-45}).wait(1).to({graphics:mask_graphics_77,x:364,y:-45}).wait(1).to({graphics:mask_graphics_78,x:364,y:-45}).wait(1).to({graphics:mask_graphics_79,x:364,y:-45}).wait(1).to({graphics:mask_graphics_80,x:364,y:-45}).wait(1).to({graphics:mask_graphics_81,x:364,y:-45}).wait(1).to({graphics:mask_graphics_82,x:364,y:-45}).wait(1).to({graphics:mask_graphics_83,x:364,y:-45}).wait(1).to({graphics:mask_graphics_84,x:364,y:-45}).wait(1).to({graphics:mask_graphics_85,x:364,y:-45}).wait(1).to({graphics:mask_graphics_86,x:364,y:-45}).wait(1).to({graphics:mask_graphics_87,x:364,y:-45}).wait(1).to({graphics:mask_graphics_88,x:364,y:-45}).wait(1).to({graphics:mask_graphics_89,x:364,y:-45}).wait(1).to({graphics:mask_graphics_90,x:364,y:-45}).wait(1).to({graphics:mask_graphics_91,x:364,y:-45}).wait(1).to({graphics:mask_graphics_92,x:364,y:-45}).wait(1).to({graphics:mask_graphics_93,x:364,y:-45}).wait(1).to({graphics:mask_graphics_94,x:364,y:-45}).wait(1).to({graphics:mask_graphics_95,x:364,y:-45}).wait(1).to({graphics:mask_graphics_96,x:364,y:-45}).wait(1).to({graphics:mask_graphics_97,x:364,y:-45}).wait(1).to({graphics:mask_graphics_98,x:364,y:-45}).wait(1).to({graphics:mask_graphics_99,x:364,y:-45}).wait(1).to({graphics:mask_graphics_100,x:364,y:-45}).wait(1).to({graphics:mask_graphics_101,x:364,y:-45}).wait(1).to({graphics:mask_graphics_102,x:364,y:-45}).wait(1).to({graphics:mask_graphics_103,x:364,y:-45}).wait(1).to({graphics:mask_graphics_104,x:364,y:-45}).wait(1).to({graphics:mask_graphics_105,x:364,y:-45}).wait(1).to({graphics:mask_graphics_106,x:364,y:-45}).wait(1).to({graphics:mask_graphics_107,x:364,y:-45}).wait(1).to({graphics:mask_graphics_108,x:364,y:-45}).wait(1).to({graphics:mask_graphics_109,x:364,y:-45}).wait(1).to({graphics:mask_graphics_110,x:364,y:-45}).wait(1).to({graphics:mask_graphics_111,x:364,y:-45}).wait(1).to({graphics:mask_graphics_112,x:364,y:-45}).wait(1).to({graphics:mask_graphics_113,x:364,y:-45}).wait(1).to({graphics:mask_graphics_114,x:364,y:-45}).wait(1).to({graphics:mask_graphics_115,x:364,y:-45}).wait(1).to({graphics:mask_graphics_116,x:364,y:-45}).wait(1).to({graphics:mask_graphics_117,x:364,y:-45}).wait(1).to({graphics:mask_graphics_118,x:364,y:-45}).wait(1).to({graphics:mask_graphics_119,x:364,y:-45}).wait(1).to({graphics:mask_graphics_120,x:364,y:-45}).wait(1).to({graphics:mask_graphics_121,x:364,y:-45}).wait(1).to({graphics:mask_graphics_122,x:364,y:-45}).wait(1).to({graphics:mask_graphics_123,x:364,y:-45}).wait(1).to({graphics:mask_graphics_124,x:364,y:-45}).wait(1).to({graphics:mask_graphics_125,x:364,y:-45}).wait(1).to({graphics:mask_graphics_126,x:364,y:-45}).wait(1).to({graphics:mask_graphics_127,x:364,y:-45}).wait(1).to({graphics:mask_graphics_128,x:364,y:-45}).wait(1).to({graphics:mask_graphics_129,x:364,y:-45}).wait(1).to({graphics:mask_graphics_130,x:364,y:-45}).wait(1).to({graphics:mask_graphics_131,x:364,y:-45}).wait(1).to({graphics:mask_graphics_132,x:364,y:-45}).wait(1).to({graphics:mask_graphics_133,x:364,y:-45}).wait(1).to({graphics:mask_graphics_134,x:364,y:-45}).wait(1).to({graphics:mask_graphics_135,x:364,y:-45}).wait(1).to({graphics:mask_graphics_136,x:364,y:-45}).wait(1).to({graphics:mask_graphics_137,x:364,y:-45}).wait(1).to({graphics:mask_graphics_138,x:364,y:-45}).wait(1).to({graphics:mask_graphics_139,x:364,y:-45}).wait(1).to({graphics:mask_graphics_140,x:364,y:-45}).wait(1).to({graphics:mask_graphics_141,x:364,y:-45}).wait(1).to({graphics:mask_graphics_142,x:364,y:-45}).wait(1).to({graphics:mask_graphics_143,x:364,y:-45}).wait(1).to({graphics:mask_graphics_144,x:364,y:-45}).wait(1).to({graphics:mask_graphics_145,x:364,y:-45}).wait(1).to({graphics:mask_graphics_146,x:364,y:-45}).wait(1).to({graphics:mask_graphics_147,x:364,y:-45}).wait(1).to({graphics:mask_graphics_148,x:364,y:-45}).wait(1).to({graphics:mask_graphics_149,x:364,y:-45}).wait(1).to({graphics:mask_graphics_150,x:364,y:-45}).wait(1).to({graphics:mask_graphics_151,x:364,y:-45}).wait(1).to({graphics:mask_graphics_152,x:364,y:-45}).wait(1).to({graphics:mask_graphics_153,x:364,y:-45}).wait(1).to({graphics:mask_graphics_154,x:364,y:-45}).wait(1).to({graphics:mask_graphics_155,x:364,y:-45}).wait(1).to({graphics:mask_graphics_156,x:364,y:-45}).wait(1).to({graphics:mask_graphics_157,x:364,y:-45}).wait(1).to({graphics:mask_graphics_158,x:364,y:-45}).wait(1).to({graphics:mask_graphics_159,x:364,y:-45}).wait(1).to({graphics:mask_graphics_160,x:364,y:-45}).wait(1).to({graphics:mask_graphics_161,x:364,y:-45}).wait(1).to({graphics:mask_graphics_162,x:364,y:-45}).wait(1).to({graphics:mask_graphics_163,x:364,y:-45}).wait(1).to({graphics:mask_graphics_164,x:364,y:-45}).wait(1).to({graphics:mask_graphics_165,x:364,y:-45}).wait(1).to({graphics:mask_graphics_166,x:364,y:-45}).wait(1).to({graphics:mask_graphics_167,x:364,y:-45}).wait(1).to({graphics:mask_graphics_168,x:364,y:-45}).wait(1).to({graphics:mask_graphics_169,x:364,y:-45}).wait(1).to({graphics:mask_graphics_170,x:364,y:-45}).wait(1).to({graphics:mask_graphics_171,x:364,y:-45}).wait(1).to({graphics:mask_graphics_172,x:364,y:-45}).wait(1).to({graphics:mask_graphics_173,x:364,y:-45}).wait(1).to({graphics:mask_graphics_174,x:364,y:-45}).wait(1).to({graphics:mask_graphics_175,x:364,y:-45}).wait(1).to({graphics:mask_graphics_176,x:364,y:-45}).wait(1).to({graphics:mask_graphics_177,x:364,y:-45}).wait(1).to({graphics:mask_graphics_178,x:364,y:-45}).wait(1).to({graphics:mask_graphics_179,x:364,y:-45}).wait(1).to({graphics:mask_graphics_180,x:364,y:-45}).wait(1).to({graphics:mask_graphics_181,x:364,y:-45}).wait(1).to({graphics:mask_graphics_182,x:364,y:-45}).wait(1).to({graphics:mask_graphics_183,x:364,y:-45}).wait(1).to({graphics:mask_graphics_184,x:364,y:-45}).wait(1).to({graphics:mask_graphics_185,x:364,y:-45}).wait(1).to({graphics:mask_graphics_186,x:364,y:-45}).wait(1).to({graphics:mask_graphics_187,x:364,y:-45}).wait(1).to({graphics:mask_graphics_188,x:364,y:-45}).wait(1).to({graphics:mask_graphics_189,x:364,y:-45}).wait(1).to({graphics:mask_graphics_190,x:364,y:-45}).wait(1).to({graphics:mask_graphics_191,x:364,y:-45}).wait(1).to({graphics:mask_graphics_192,x:364,y:-45}).wait(1).to({graphics:mask_graphics_193,x:364,y:-45}).wait(1).to({graphics:mask_graphics_194,x:364,y:-45}).wait(1).to({graphics:mask_graphics_195,x:364,y:-45}).wait(1).to({graphics:mask_graphics_196,x:364,y:-45}).wait(1).to({graphics:mask_graphics_197,x:364,y:-45}).wait(1).to({graphics:mask_graphics_198,x:364,y:-45}).wait(1).to({graphics:mask_graphics_199,x:364,y:-45}).wait(1).to({graphics:mask_graphics_200,x:364,y:-45}).wait(1).to({graphics:mask_graphics_201,x:364,y:-45}).wait(1).to({graphics:mask_graphics_202,x:364,y:-45}).wait(1).to({graphics:mask_graphics_203,x:364,y:-45}).wait(1).to({graphics:mask_graphics_204,x:364,y:-45}).wait(1).to({graphics:mask_graphics_205,x:364,y:-45}).wait(1).to({graphics:mask_graphics_206,x:364,y:-45}).wait(1).to({graphics:mask_graphics_207,x:364,y:-45}).wait(1).to({graphics:mask_graphics_208,x:364,y:-45}).wait(1).to({graphics:mask_graphics_209,x:364,y:-45}).wait(1).to({graphics:mask_graphics_210,x:364,y:-45}).wait(1).to({graphics:mask_graphics_211,x:364,y:-45}).wait(1).to({graphics:mask_graphics_212,x:364,y:-45}).wait(1).to({graphics:mask_graphics_213,x:364,y:-45}).wait(1).to({graphics:mask_graphics_214,x:364,y:-45}).wait(1).to({graphics:mask_graphics_215,x:364,y:-45}).wait(1).to({graphics:mask_graphics_216,x:364,y:-45}).wait(1).to({graphics:mask_graphics_217,x:364,y:-45}).wait(1).to({graphics:mask_graphics_218,x:364,y:-45}).wait(1).to({graphics:mask_graphics_219,x:364,y:-45}).wait(1).to({graphics:mask_graphics_220,x:364,y:-45}).wait(1).to({graphics:mask_graphics_221,x:364,y:-45}).wait(1).to({graphics:mask_graphics_222,x:364,y:-45}).wait(1).to({graphics:mask_graphics_223,x:364,y:-45}).wait(1).to({graphics:mask_graphics_224,x:364,y:-45}).wait(1).to({graphics:mask_graphics_225,x:364,y:-45}).wait(1).to({graphics:mask_graphics_226,x:364,y:-45}).wait(1).to({graphics:mask_graphics_227,x:364,y:-45}).wait(1).to({graphics:mask_graphics_228,x:364,y:-45}).wait(1).to({graphics:mask_graphics_229,x:364,y:-45}).wait(1).to({graphics:mask_graphics_230,x:364,y:-45}).wait(1).to({graphics:mask_graphics_231,x:364,y:-45}).wait(1).to({graphics:mask_graphics_232,x:364,y:-45}).wait(1).to({graphics:mask_graphics_233,x:364,y:-45}).wait(1).to({graphics:mask_graphics_234,x:364,y:-45}).wait(1).to({graphics:mask_graphics_235,x:364,y:-45}).wait(1).to({graphics:mask_graphics_236,x:364,y:-45}).wait(1).to({graphics:mask_graphics_237,x:364,y:-45}).wait(1).to({graphics:mask_graphics_238,x:364,y:-45}).wait(1).to({graphics:mask_graphics_239,x:364,y:-45}).wait(1).to({graphics:mask_graphics_240,x:364,y:-45}).wait(1).to({graphics:mask_graphics_241,x:364,y:-45}).wait(1).to({graphics:mask_graphics_242,x:364,y:-45}).wait(1).to({graphics:mask_graphics_243,x:364,y:-45}).wait(1).to({graphics:mask_graphics_244,x:364,y:-45}).wait(1).to({graphics:mask_graphics_245,x:364,y:-45}).wait(1).to({graphics:mask_graphics_246,x:364,y:-45}).wait(1).to({graphics:mask_graphics_247,x:364,y:-45}).wait(1).to({graphics:mask_graphics_248,x:364,y:-45}).wait(1).to({graphics:mask_graphics_249,x:364,y:-45}).wait(1).to({graphics:mask_graphics_250,x:364,y:-45}).wait(1).to({graphics:mask_graphics_251,x:364,y:-45}).wait(1).to({graphics:mask_graphics_252,x:364,y:-45}).wait(1).to({graphics:mask_graphics_253,x:364,y:-45}).wait(1).to({graphics:mask_graphics_254,x:364,y:-45}).wait(1).to({graphics:mask_graphics_255,x:364,y:-45}).wait(1).to({graphics:mask_graphics_256,x:364,y:-45}).wait(1).to({graphics:mask_graphics_257,x:364,y:-45}).wait(1).to({graphics:mask_graphics_258,x:364,y:-45}).wait(1).to({graphics:mask_graphics_259,x:364,y:-45}).wait(1).to({graphics:mask_graphics_260,x:364,y:-45}).wait(1).to({graphics:mask_graphics_261,x:364,y:-45}).wait(1).to({graphics:mask_graphics_262,x:364,y:-45}).wait(1).to({graphics:mask_graphics_263,x:364,y:-45}).wait(1).to({graphics:mask_graphics_264,x:364,y:-45}).wait(1).to({graphics:mask_graphics_265,x:364,y:-45}).wait(1).to({graphics:mask_graphics_266,x:364,y:-45}).wait(1).to({graphics:mask_graphics_267,x:364,y:-45}).wait(1).to({graphics:mask_graphics_268,x:364,y:-45}).wait(1).to({graphics:mask_graphics_269,x:364,y:-45}).wait(1).to({graphics:mask_graphics_270,x:364,y:-45}).wait(1).to({graphics:mask_graphics_271,x:364,y:-45}).wait(1).to({graphics:mask_graphics_272,x:364,y:-45}).wait(1).to({graphics:mask_graphics_273,x:364,y:-45}).wait(1).to({graphics:mask_graphics_274,x:364,y:-45}).wait(1).to({graphics:mask_graphics_275,x:364,y:-45}).wait(1).to({graphics:mask_graphics_276,x:364,y:-45}).wait(1).to({graphics:mask_graphics_277,x:364,y:-45}).wait(1).to({graphics:mask_graphics_278,x:364,y:-45}).wait(1).to({graphics:mask_graphics_279,x:364,y:-45}).wait(1).to({graphics:mask_graphics_280,x:364,y:-45}).wait(1).to({graphics:mask_graphics_281,x:364,y:-45}).wait(1).to({graphics:mask_graphics_282,x:364,y:-45}).wait(1).to({graphics:mask_graphics_283,x:364,y:-45}).wait(1).to({graphics:mask_graphics_284,x:364,y:-45}).wait(1).to({graphics:mask_graphics_285,x:364,y:-45}).wait(1).to({graphics:mask_graphics_286,x:364,y:-45}).wait(1).to({graphics:mask_graphics_287,x:364,y:-45}).wait(1).to({graphics:mask_graphics_288,x:364,y:-45}).wait(1).to({graphics:mask_graphics_289,x:364,y:-45}).wait(1).to({graphics:mask_graphics_290,x:364,y:-45}).wait(1).to({graphics:mask_graphics_291,x:364,y:-45}).wait(1).to({graphics:mask_graphics_292,x:364,y:-45}).wait(1).to({graphics:mask_graphics_293,x:364,y:-45}).wait(1).to({graphics:mask_graphics_294,x:364,y:-45}).wait(1).to({graphics:mask_graphics_295,x:364,y:-45}).wait(1).to({graphics:mask_graphics_296,x:364,y:-45}).wait(1).to({graphics:mask_graphics_297,x:364,y:-45}).wait(1).to({graphics:mask_graphics_298,x:364,y:-45}).wait(1).to({graphics:mask_graphics_299,x:364,y:-45}).wait(1).to({graphics:mask_graphics_300,x:364,y:-45}).wait(1).to({graphics:mask_graphics_301,x:364,y:-45}).wait(1).to({graphics:mask_graphics_302,x:364,y:-45}).wait(1).to({graphics:mask_graphics_303,x:364,y:-45}).wait(1).to({graphics:mask_graphics_304,x:364,y:-45}).wait(1).to({graphics:mask_graphics_305,x:364,y:-45}).wait(1).to({graphics:mask_graphics_306,x:364,y:-45}).wait(1).to({graphics:mask_graphics_307,x:364,y:-45}).wait(1).to({graphics:mask_graphics_308,x:364,y:-45}).wait(1).to({graphics:mask_graphics_309,x:364,y:-45}).wait(1).to({graphics:mask_graphics_310,x:364,y:-45}).wait(1).to({graphics:mask_graphics_311,x:364,y:-45}).wait(1).to({graphics:mask_graphics_312,x:364,y:-45}).wait(1).to({graphics:mask_graphics_313,x:364,y:-45}).wait(1).to({graphics:mask_graphics_314,x:364,y:-45}).wait(1).to({graphics:mask_graphics_315,x:364,y:-45}).wait(1).to({graphics:mask_graphics_316,x:364,y:-45}).wait(1).to({graphics:mask_graphics_317,x:364,y:-45}).wait(1).to({graphics:mask_graphics_318,x:364,y:-45}).wait(1).to({graphics:mask_graphics_319,x:364,y:-45}).wait(1).to({graphics:mask_graphics_320,x:364,y:-45}).wait(1).to({graphics:mask_graphics_321,x:364,y:-45}).wait(1).to({graphics:mask_graphics_322,x:364,y:-45}).wait(1).to({graphics:mask_graphics_323,x:364,y:-45}).wait(1).to({graphics:mask_graphics_324,x:364,y:-45}).wait(1).to({graphics:mask_graphics_325,x:364,y:-45}).wait(1).to({graphics:mask_graphics_326,x:364,y:-45}).wait(1).to({graphics:mask_graphics_327,x:364,y:-45}).wait(1).to({graphics:mask_graphics_328,x:364,y:-45}).wait(1).to({graphics:mask_graphics_329,x:364,y:-45}).wait(1).to({graphics:mask_graphics_330,x:364,y:-45}).wait(1).to({graphics:mask_graphics_331,x:364,y:-45}).wait(1).to({graphics:mask_graphics_332,x:364,y:-45}).wait(1).to({graphics:mask_graphics_333,x:364,y:-45}).wait(1).to({graphics:mask_graphics_334,x:364,y:-45}).wait(1).to({graphics:mask_graphics_335,x:364,y:-45}).wait(1).to({graphics:mask_graphics_336,x:364,y:-45}).wait(1).to({graphics:mask_graphics_337,x:364,y:-45}).wait(1).to({graphics:mask_graphics_338,x:364,y:-45}).wait(1).to({graphics:mask_graphics_339,x:364,y:-45}).wait(1).to({graphics:mask_graphics_340,x:364,y:-45}).wait(1).to({graphics:mask_graphics_341,x:364,y:-45}).wait(1).to({graphics:mask_graphics_342,x:364,y:-44.8}).wait(1).to({graphics:mask_graphics_343,x:364,y:-44.4}).wait(1).to({graphics:mask_graphics_344,x:364,y:-43.55}).wait(1).to({graphics:mask_graphics_345,x:364,y:-42.1}).wait(1).to({graphics:mask_graphics_346,x:364,y:-40.05}).wait(1).to({graphics:mask_graphics_347,x:364,y:-37.1}).wait(1).to({graphics:mask_graphics_348,x:364,y:-33.2}).wait(1).to({graphics:mask_graphics_349,x:364,y:-28.2}).wait(1).to({graphics:mask_graphics_350,x:364,y:-21.95}).wait(1).to({graphics:mask_graphics_351,x:364,y:-14.35}).wait(1).to({graphics:mask_graphics_352,x:364,y:-5.2}).wait(1).to({graphics:mask_graphics_353,x:364,y:5.2}).wait(1).to({graphics:mask_graphics_354,x:364,y:14.35}).wait(1).to({graphics:mask_graphics_355,x:364,y:21.95}).wait(1).to({graphics:mask_graphics_356,x:364,y:28.2}).wait(1).to({graphics:mask_graphics_357,x:364,y:33.2}).wait(1).to({graphics:mask_graphics_358,x:364,y:37.1}).wait(1).to({graphics:mask_graphics_359,x:364,y:40}).wait(1).to({graphics:mask_graphics_360,x:364,y:42.1}).wait(1).to({graphics:mask_graphics_361,x:364,y:43.55}).wait(1).to({graphics:mask_graphics_362,x:364,y:44.4}).wait(1).to({graphics:mask_graphics_363,x:364,y:44.8}).wait(1).to({graphics:mask_graphics_364,x:364,y:45}).wait(1).to({graphics:mask_graphics_365,x:364,y:45}).wait(1).to({graphics:mask_graphics_366,x:364,y:45}).wait(1).to({graphics:mask_graphics_367,x:364,y:45}).wait(1).to({graphics:mask_graphics_368,x:364,y:45}).wait(1).to({graphics:mask_graphics_369,x:364,y:45}).wait(1).to({graphics:mask_graphics_370,x:364,y:45}).wait(1).to({graphics:mask_graphics_371,x:364,y:45}).wait(1).to({graphics:mask_graphics_372,x:364,y:45}).wait(1).to({graphics:mask_graphics_373,x:364,y:45}).wait(1).to({graphics:mask_graphics_374,x:364,y:45}).wait(1).to({graphics:mask_graphics_375,x:364,y:45}).wait(1).to({graphics:mask_graphics_376,x:364,y:45}).wait(1).to({graphics:mask_graphics_377,x:364,y:45}).wait(1).to({graphics:mask_graphics_378,x:364,y:45}).wait(1).to({graphics:mask_graphics_379,x:364,y:45}).wait(1).to({graphics:mask_graphics_380,x:364,y:45}).wait(1).to({graphics:mask_graphics_381,x:364,y:45}).wait(1).to({graphics:mask_graphics_382,x:364,y:45}).wait(1).to({graphics:mask_graphics_383,x:364,y:45}).wait(1).to({graphics:mask_graphics_384,x:364,y:45}).wait(1).to({graphics:mask_graphics_385,x:364,y:45}).wait(1).to({graphics:mask_graphics_386,x:364,y:45}).wait(1).to({graphics:mask_graphics_387,x:364,y:45}).wait(1).to({graphics:mask_graphics_388,x:364,y:45}).wait(1).to({graphics:mask_graphics_389,x:364,y:45}).wait(1).to({graphics:mask_graphics_390,x:364,y:45}).wait(1).to({graphics:mask_graphics_391,x:364,y:45}).wait(1).to({graphics:mask_graphics_392,x:364,y:45}).wait(1).to({graphics:mask_graphics_393,x:364,y:45}).wait(1).to({graphics:mask_graphics_394,x:364,y:45}).wait(1).to({graphics:mask_graphics_395,x:364,y:45}).wait(1).to({graphics:mask_graphics_396,x:364,y:45}).wait(1).to({graphics:mask_graphics_397,x:364,y:45}).wait(1).to({graphics:mask_graphics_398,x:364,y:45}).wait(1).to({graphics:mask_graphics_399,x:364,y:45}).wait(1).to({graphics:mask_graphics_400,x:364,y:45}).wait(1).to({graphics:mask_graphics_401,x:364,y:45}).wait(1).to({graphics:mask_graphics_402,x:364,y:45}).wait(1).to({graphics:mask_graphics_403,x:364,y:45}).wait(1).to({graphics:mask_graphics_404,x:364,y:45}).wait(1).to({graphics:mask_graphics_405,x:364,y:45}).wait(1).to({graphics:mask_graphics_406,x:364,y:45}).wait(1).to({graphics:mask_graphics_407,x:364,y:45}).wait(1).to({graphics:mask_graphics_408,x:364,y:45}).wait(1).to({graphics:mask_graphics_409,x:364,y:45}).wait(1).to({graphics:mask_graphics_410,x:364,y:45}).wait(1).to({graphics:mask_graphics_411,x:364,y:45}).wait(1).to({graphics:mask_graphics_412,x:364,y:45}).wait(1).to({graphics:mask_graphics_413,x:364,y:45}).wait(1).to({graphics:mask_graphics_414,x:364,y:45}).wait(1).to({graphics:mask_graphics_415,x:364,y:45}).wait(1).to({graphics:mask_graphics_416,x:364,y:45}).wait(1).to({graphics:mask_graphics_417,x:364,y:45}).wait(1).to({graphics:mask_graphics_418,x:364,y:45}).wait(1).to({graphics:mask_graphics_419,x:364,y:45}).wait(1).to({graphics:mask_graphics_420,x:364,y:45}).wait(1));

	// logo_negatif
	this.instance = new lib.Logo_SantanderInternationalneg();
	this.instance.setTransform(173.9,75.05,0.3867,0.3863,0,0,0,408.4,123);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({_off:false},0).wait(317).to({regX:150,regY:45.1,x:74,y:44.95},0).wait(8).to({scaleY:0.3862},0).wait(1).to({scaleX:0.3866},0).wait(2).to({regX:408.5,regY:123,x:173.95,y:75.05},0).wait(58).to({alpha:0},10).wait(1));

	// logo_pos
	this.instance_1 = new lib.Logo_SantanderInternationalpos();
	this.instance_1.setTransform(173.9,75.05,0.3867,0.3863,0,0,0,408.4,123);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(341).to({regX:150,regY:45.1,x:74,y:45.6},0).wait(1).to({y:46.8},0).wait(1).to({y:48.5},0).wait(1).to({y:50.85},0).wait(1).to({y:54},0).wait(1).to({y:58.05},0).wait(1).to({y:63.2},0).wait(1).to({y:69.8},0).wait(1).to({scaleY:0.3862,y:78.15},0).wait(1).to({scaleX:0.3866,y:88.75},0).wait(1).to({y:102.15},0).wait(1).to({regX:408.5,regY:123,x:173.95,y:148.6},0).wait(69));

	// header_animated
	this.instance_2 = new lib.mc_level1_728_animated();
	this.instance_2.setTransform(210.55,46.8,0.5947,0.5949,0,0,0,86.2,77);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(29).to({_off:false},0).wait(1).to({regX:329.4,regY:40.4,x:355.2,y:25.05},0).wait(300).to({regX:86.2,regY:77,x:210.55,y:46.8},0).wait(1).to({regX:329.4,regY:40.4,x:355.2,y:25.75,alpha:0.9911},0).wait(1).to({y:27,alpha:0.976},0).wait(1).to({y:28.85,alpha:0.9536},0).wait(1).to({y:31.4,alpha:0.9225},0).wait(1).to({y:34.8,alpha:0.8811},0).wait(1).to({y:39.25,alpha:0.827},0).wait(1).to({y:44.95,alpha:0.7574},0).wait(1).to({y:52.3,alpha:0.6679},0).wait(1).to({y:61.75,alpha:0.5532},0).wait(1).to({y:73.8,alpha:0.4064},0).wait(1).to({y:89,alpha:0.2214},0).wait(1).to({regX:86.2,regY:77.2,x:210.55,y:129.05,alpha:0},0).wait(1).to({regX:329.4,regY:40.4,x:355.2,y:123.85},0).wait(1).to({y:139.3},0).wait(1).to({y:152.05},0).wait(1).to({y:162},0).wait(1).to({y:169.6},0).wait(1).to({y:175.45},0).wait(1).to({y:179.9},0).wait(1).to({y:183.25},0).wait(1).to({y:185.75},0).wait(1).to({y:187.45},0).wait(1).to({y:188.6},0).wait(1).to({y:189.25},0).wait(1).to({regX:86.2,regY:77.2,x:210.55,y:211.3},0).wait(66));

	// subheader_3
	this.instance_3 = new lib.mc_level2_3();
	this.instance_3.setTransform(219.9,220.55,0.8664,0.8665,0,0,0,68.8,43.3);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(91).to({_off:false},0).wait(1).to({regX:106.8,regY:15.4,x:252.85,y:195.95},0).wait(1).to({y:195.15},0).wait(1).to({y:194.05},0).wait(1).to({y:192.5},0).wait(1).to({y:190.4},0).wait(1).to({y:187.7},0).wait(1).to({y:184.2},0).wait(1).to({y:179.7},0).wait(1).to({y:173.95},0).wait(1).to({y:166.6},0).wait(1).to({y:157.3},0).wait(1).to({y:146.2},0).wait(1).to({y:134.3},0).wait(1).to({y:123.35},0).wait(1).to({y:114.3},0).wait(1).to({regX:68.8,regY:43.2,x:219.9,y:131.45},0).wait(1).to({regX:106.8,regY:15.4,x:252.85,y:97.3,alpha:0.2784},0).wait(1).to({y:89.65,alpha:0.4913},0).wait(1).to({y:83.8,alpha:0.6534},0).wait(1).to({y:79.4,alpha:0.7753},0).wait(1).to({y:76.15,alpha:0.865},0).wait(1).to({y:73.9,alpha:0.9284},0).wait(1).to({y:72.4,alpha:0.9699},0).wait(1).to({y:71.55,alpha:0.9928},0).wait(1).to({regX:68.8,regY:43.3,x:219.9,y:95.4,alpha:1},0).wait(214).to({regY:43.2,y:150.85,alpha:0},9,cjs.Ease.quartInOut).to({regY:43.3,y:187.15},16,cjs.Ease.quartInOut).wait(66));

	// subheader_2
	this.instance_4 = new lib.mc_level2_2();
	this.instance_4.setTransform(442.5,217.55,0.8664,0.8665,0,0,0,68.8,43.3);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(75).to({_off:false},0).wait(1).to({regX:97.6,regY:17.1,x:467.45,y:194.4},0).wait(1).to({y:193.6},0).wait(1).to({y:192.5},0).wait(1).to({y:190.95},0).wait(1).to({y:188.85},0).wait(1).to({y:186.15},0).wait(1).to({y:182.65},0).wait(1).to({y:178.15},0).wait(1).to({y:172.4},0).wait(1).to({y:165.05},0).wait(1).to({y:155.8},0).wait(1).to({y:144.7},0).wait(1).to({y:132.8},0).wait(1).to({y:121.85},0).wait(1).to({y:112.85},0).wait(1).to({regX:68.8,regY:43.3,x:442.5,y:128.5},0).wait(1).to({regX:97.6,regY:17.1,x:467.45,y:91.05,alpha:0.2784},0).wait(1).to({y:79.8,alpha:0.4913},0).wait(1).to({y:71.2,alpha:0.6534},0).wait(1).to({y:64.75,alpha:0.7753},0).wait(1).to({y:60,alpha:0.865},0).wait(1).to({y:56.65,alpha:0.9284},0).wait(1).to({y:54.45,alpha:0.9699},0).wait(1).to({y:53.25,alpha:0.9928},0).wait(1).to({regX:68.8,regY:43.3,x:442.5,y:75.6,alpha:1},0).wait(230).to({y:128.5,alpha:0},9,cjs.Ease.quartInOut).to({y:184.45},16,cjs.Ease.quartInOut).wait(66));

	// subheader_1
	this.instance_5 = new lib.mc_level2_1();
	this.instance_5.setTransform(219.9,217.55,0.8664,0.8665,0,0,0,68.8,43.3);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(59).to({_off:false},0).wait(1).to({regX:126.5,regY:17.1,x:269.9,y:194.4},0).wait(1).to({y:193.6},0).wait(1).to({y:192.5},0).wait(1).to({y:190.95},0).wait(1).to({y:188.85},0).wait(1).to({y:186.15},0).wait(1).to({y:182.65},0).wait(1).to({y:178.15},0).wait(1).to({y:172.4},0).wait(1).to({y:165.05},0).wait(1).to({y:155.8},0).wait(1).to({y:144.7},0).wait(1).to({y:132.8},0).wait(1).to({y:121.85},0).wait(1).to({y:112.85},0).wait(1).to({regX:68.8,regY:43.3,x:219.9,y:128.5},0).wait(1).to({regX:126.5,regY:17.1,x:269.9,y:91.05,alpha:0.2784},0).wait(1).to({y:79.8,alpha:0.4913},0).wait(1).to({y:71.2,alpha:0.6534},0).wait(1).to({y:64.75,alpha:0.7753},0).wait(1).to({y:60,alpha:0.865},0).wait(1).to({y:56.65,alpha:0.9284},0).wait(1).to({y:54.45,alpha:0.9699},0).wait(1).to({y:53.25,alpha:0.9928},0).wait(1).to({regX:68.8,regY:43.3,x:219.9,y:75.6,alpha:1},0).wait(246).to({y:128.5,alpha:0},9,cjs.Ease.quartInOut).to({y:184.45},16,cjs.Ease.quartInOut).wait(66));

	// T_C
	this.instance_6 = new lib.mc_level3();
	this.instance_6.setTransform(396.5,203,0.6624,0.6626,0,0,0,68.2,42.9);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(116).to({_off:false},0).wait(1).to({regX:150.4,regY:18,x:450.9,y:186.45},0).wait(1).to({y:186.15},0).wait(1).to({y:185.65},0).wait(1).to({y:184.8},0).wait(1).to({y:183.65},0).wait(1).to({y:182.05},0).wait(1).to({y:179.85},0).wait(1).to({y:176.85},0).wait(1).to({y:172.55},0).wait(1).to({y:166.25},0).wait(1).to({y:156},0).wait(1).to({y:139.4},0).wait(1).to({x:450.95,y:123.7},0).wait(1).to({y:114.15},0).wait(1).to({y:108},0).wait(1).to({regX:68.2,regY:43,x:396.45,y:120.25},0).wait(1).to({regX:150.4,regY:18,x:450.85,y:95.05,alpha:0.2857},0).wait(1).to({y:88.6,alpha:0.4987},0).wait(1).to({y:83.75,alpha:0.659},0).wait(1).to({x:450.8,y:80.15,alpha:0.779},0).wait(1).to({y:77.45,alpha:0.8671},0).wait(1).to({y:75.6,alpha:0.9294},0).wait(1).to({y:74.35,alpha:0.9703},0).wait(1).to({y:73.65,alpha:0.9929},0).wait(1).to({regX:68.2,regY:42.9,x:396.5,y:90,alpha:1},0).wait(189).to({regY:43,x:396.45,y:142.35,alpha:0},9,cjs.Ease.quartInOut).to({regY:42.9,x:396.5,y:174.45},16,cjs.Ease.quartInOut).to({_off:true},1).wait(65));

	// primary_cta
	this.instance_7 = new lib.primary_cta();
	this.instance_7.setTransform(648,194.25,0.8333,0.8338,0,0,0,72,17.1);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;
	new cjs.ButtonHelper(this.instance_7, 0, 1, 2, false, new lib.primary_cta(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(151).to({_off:false},0).wait(1).to({regX:71.1,regY:-235,x:647.25,y:-16.35},0).wait(1).to({y:-17.05},0).wait(1).to({y:-18.05},0).wait(1).to({y:-19.4},0).wait(1).to({y:-21.25},0).wait(1).to({y:-23.65},0).wait(1).to({y:-26.75},0).wait(1).to({y:-30.7},0).wait(1).to({y:-35.8},0).wait(1).to({y:-42.3},0).wait(1).to({y:-50.5},0).wait(1).to({y:-60.3},0).wait(1).to({y:-70.8},0).wait(1).to({y:-80.5},0).wait(1).to({y:-88.5},0).wait(1).to({y:-94.7},0).wait(1).to({y:-99.5},0).wait(1).to({y:-103.2},0).wait(1).to({regX:72,regY:17.1,x:648,y:104.25},0).wait(1).to({regX:71.1,regY:-235,x:647.25,y:-126.8,alpha:0.3518},0).wait(1).to({y:-142.1,alpha:0.6106},0).wait(1).to({y:-152.9,alpha:0.7935},0).wait(1).to({y:-160,alpha:0.9131},0).wait(1).to({y:-163.9,alpha:0.9794},0).wait(1).to({regX:72,regY:17.1,x:648,y:45.1,alpha:1},0).wait(145).to({regX:71.1,regY:-235,x:647.25,y:-162.1,alpha:0.9487},0).wait(1).to({y:-156.9,alpha:0.8612},0).wait(1).to({y:-149.25,alpha:0.7315},0).wait(1).to({y:-138.6,alpha:0.5519},0).wait(1).to({y:-124.45,alpha:0.3124},0).wait(1).to({regX:72,regY:17.1,x:648,y:104.25,alpha:0},0).wait(1).to({regX:71.1,regY:-235,x:647.25,y:-102.85},0).wait(1).to({y:-98.8},0).wait(1).to({y:-93.6},0).wait(1).to({y:-86.95},0).wait(1).to({y:-78.6},0).wait(1).to({y:-68.6},0).wait(1).to({y:-57.9},0).wait(1).to({y:-48},0).wait(1).to({y:-39.9},0).wait(1).to({y:-33.55},0).wait(1).to({y:-28.65},0).wait(1).to({y:-24.9},0).wait(1).to({y:-22.05},0).wait(1).to({y:-19.9},0).wait(1).to({y:-18.35},0).wait(1).to({y:-17.25},0).wait(1).to({y:-16.5},0).wait(1).to({y:-16.1},0).wait(1).to({regX:72,regY:17.1,x:648,y:194.25},0).wait(76));

	// background_colour
	this.instance_8 = new lib.mc_background();
	this.instance_8.setTransform(150,300,1,1,0,0,0,150,300);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({y:210},24,cjs.Ease.quartInOut).wait(316).to({y:300},25,cjs.Ease.cubicInOut).wait(56));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(364,-370.2,408.20000000000005,604.5);
// library properties:
lib.properties = {
	id: '05920BE2A36F420086AAC3866015E257',
	width: 728,
	height: 90,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['05920BE2A36F420086AAC3866015E257'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;