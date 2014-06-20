// ----- Set Visibility -----
// Invoked onLoad on pages with hide/show functionality.



function setArticleInfoVisibility(articleID) {

	switch(readCookie(articleID)) {
		case 'visible':
			// Make sure the _child element is visible too (some browsers set null by default)
			document.getElementById("articleInformation").style.visibility="visible";
			document.getElementById("articleInformation").style.display="block";
			break;

		case 'hidden':
			// Make sure the _child element is hidden too
			document.getElementById("articleInformation").style.visibility="hidden";
			document.getElementById("articleInformation").style.display="none";
			document.getElementById("toggleLink").style.backgroundImage = "url('/display/common/images/buttons/toggle_closed.gif')";
			break;
		default:
			// No cookie found. Create one and set the style to visible.
			createCookie(articleID,"visible","");
			document.getElementById("articleInformation").style.visibility="visible";
			document.getElementById("articleInformation").style.display="block";
			break;
	}

}


// ----- Swap functions -----
// In the swap, showAll, and hideAll functions, replace the paths to the images with the full path to the image.


function swapArticleInfo(articleID) {

	if (document.getElementById("articleInformation").style.visibility=="visible") {
		document.getElementById("articleInformation").style.visibility="hidden";
		document.getElementById("articleInformation").style.display="none";
		document.getElementById("toggleLink").style.backgroundImage = "url('/display/common/images/buttons/toggle_closed.gif')";
		createCookie(articleID,"hidden","");
	}
	else if(document.getElementById("articleInformation").style.visibility=="hidden"){
		document.getElementById("articleInformation").style.visibility="visible";
		document.getElementById("articleInformation").style.display="block";
		document.getElementById("toggleLink").style.backgroundImage = "url('/display/common/images/buttons/toggle_open.gif')";
		createCookie(articleID,"visible","");
	}
	else{
		//initial click, visibility isn't defined
		document.getElementById("articleInformation").style.visibility="hidden";
		document.getElementById("articleInformation").style.display="none";
		document.getElementById("toggleLink").style.backgroundImage = "url('/display/common/images/buttons/toggle_closed.gif')";
		createCookie(articleID,"hidden","");
	}
}




// ----- Cookie Functions -----

function createCookie(name,value,days)
{
        if (days)
        {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name)
{
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++)
        {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
}

function eraseCookie(name)
{
        createCookie(name,"",-1);
}
