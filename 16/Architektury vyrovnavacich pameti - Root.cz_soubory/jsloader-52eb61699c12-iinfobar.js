/*
 * Detekce polozek, ktere se nevejdou do prvniho radku.
 * Zobrazene polozky maji position 0.
 * Polozky, které pretekly na dalsi radek maji position.top vetsi nez 0.
 * Temto položkám se nastavi class otherItem. Pokud se polozky po zmene velikosti
 * okna vejdou, nastavi se jim zpet class normalItem
 */
var resizeHandler = function () {
	var nextLine = false;
	rightPos = $(".sub").position();
	$('#sefa.iinfoBar li').each(function() {
		var $this = $(this);
		if ($this.position().top > 0) {
			$this.addClass("otherItem");

			$this.removeClass("normalItem");

			nextLine = true;
		} else if ($this.position().top === 0) {
			$this.addClass("normalItem");
			$this.removeClass("otherItem");
			$('li.normalItem:last').removeClass("lastNormalItem");
		}
	});

	// Abych nemusel porovnavat, ktere polozky jiz v seznamu jsou a ktere ne, tak seznam polozek vymazu a sestavim ho znovu
	$('#otherItems').empty();
	$(".otherItem").clone(true).prependTo("#otherItems");

	// Pokud polozky v menu pretecou, nastavi se nextLine na TRUE a dle toho se zobrazuje/skryva tlacitko Dalsi
	if (nextLine) {
		$("#nextItemsButton").show();
	} else {
		$("#nextItemsButton").hide();
	}
 };

// sledovani hybani s oknem
$(window).load(resizeHandler);
$(window).resize(resizeHandler);

/* Toto zajistuje, aby menu zmizelo, jakmile se z nej odjede mysi na dobu delsi nez
300 ms. Pokud se mysi setrva na seznamu nebo tlacitku Dalsi, tak se menu nezavre. */
$(function() {
	$("#sefa.iinfoBar .sub").append("<div id='nextItemsButton'>dal\u0161\u00ed</div>"); // Vyrobi se tlacitko Dalsi
	$("#nextItemsButton").append("<ul id='otherItems'></ul>"); // Vyrobi se seznam pro Dalsi položky
	$("#otherItems").hide(); // Defaultne se skryje seznam dalsich polozek

	// Pri najeti mysi na tlacitko Dalsi se rozbali menu dalsich polozek
	$("#nextItemsButton").hover(function () {
		$("#otherItems").slideDown('fast');
	});

	var openMenu = 0;
	var hideTimer;
	var hideMenuFunc = function() {
		clearTimeout(hideTimer);
		$("#otherItems").hide();
		openMenu = 0;
	};

	$("#otherItems, #nextItemsButton").hover(
		function() {
			if (openMenu && hideTimer) {
				clearTimeout(hideTimer);
				hideTimer = null;
			}
		},
		function() {
			if (openMenu) {
				hideTimer = setTimeout(hideMenuFunc, 300);
			}
		});

	$("#nextItemsButton").hover(
		function() {
			$("#otherItems").show();
			openMenu = 1;
		});
});