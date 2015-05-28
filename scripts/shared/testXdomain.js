/**
 * Created by jhorlin.dearmas on 5/28/2015.
 */
(function(context, Modernizr){
    "use strict";
    Modernizr.addTest('xdomain', function(){
        return 'withCredentials' in new XMLHttpRequest() && !('XDomainRequest' in context);
    });
}(this, this.Modernizr));