define(["jquery"], function($){

	var topics = {};
	 
	var Topic = function( id ) {
		var callbacks,
			method,
			topic = id && topics[ id ];
	 
		if ( !topic ) {
			callbacks = $.Callbacks();
			topic = {
				publish: callbacks.fire,
				subscribe: callbacks.add,
				unsubscribe: callbacks.remove
			};
			if ( id ) {
				topics[ id ] = topic;
			}
		}
		return topic;
	};

	return Topic;

});