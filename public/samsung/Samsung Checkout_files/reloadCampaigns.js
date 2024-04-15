//<script>
bouncex.tryCatch(function reloadCampaigns(){
	var newCampaigns = false;
	bouncex.creatives = false;
	bouncex.brandStyles = false;
	bouncex.webfonts = false;

	if (bouncex.gbi) {
		bouncex.gbi.stacks = false;
	}

	var newCookie = {"did":"4736819819835619576","vid":1713118191006105,"v":{"cart_qty":5,"cart_value":10550,"submitted_onsite":false,"ibx_prev_id":false,"ibx_atc_id":false,"cart_set":false,"ibx_cart_obj":false,"logged_in_identified":false,"cart":false,"registered":false,"samsung_care":false},"dgFirstLoad":true,"hardID":"2eptAdC3SEXVlA3vNzPmcBHV9R9","softID":"2eptAeIsneNeOYU4g7Chof22koi","dg":{"isPreviousCustomer":false,"isSubscriber":false,"uid2":{"advertising_token":"AgAACA4YvLNzhO\/AsaCbWH67iK29xp9fl2tJOokFoVd4uN9EW8u8w3FATDZaACr4wlsJUA\/JwulLWQaEF00YpS0djcGjosxc4yHsgBFF0Bhp3Wowxlt93gvTyhsmZHnr2xVBBDJ9n49VkhCKRnieWbQ0voEI+g86OMxLAaQOrVvHmQJ9HQ==","identity_expires":1713204721670},"cache_ts":1713118319264},"fvt":1712613262,"ao":2,"lp":"https%3A%2F%2Fwww.samsung.com%2Fus%2Fweb%2Fbusiness%2Fexpress%2Fcheckout","as":0,"vpv":3,"d":"d","r":"","cvt":1713118190,"sid":11,"gcr":96,"m":0,"lvt":1713118464,"campaigns":{"2285566":{"lvt":1712613206,"lavid":1,"la":1712613204,"fsa":1712613204,"as":1,"ao":1,"oa":[1712613204],"io":1,"wc":1712613212},"2400071":{"lvt":1712680628,"lavid":1,"as":1,"la":1712680628,"fsa":1712680628,"ao":1,"oa":[1712680628],"io":1,"wc":1712680629}},"uid":1};
	var campaignAdded = false;
	for (var campaignId in newCampaigns) {
		if (newCampaigns.hasOwnProperty(campaignId)) {
			// if campaign cookie does not exist
			if (!bouncex.cookie.campaigns) {
				bouncex.cookie.campaigns = {};
			} else {
				bouncex.cookie.campaigns = Object.assign({}, bouncex.cookie.campaigns);
			}

			if (!bouncex.cookie.campaigns[campaignId]) {
				campaignAdded = true;
				bouncex.cookie.campaigns[campaignId] = {lvt:bouncex.cookie.lvt, vv:0};
			} else if (newCookie.campaigns[campaignId]) {
				// need to set campaign cookie's activations_sessions to the new cookie as it gets modified in reloadCampaigns
				campaignAdded = true;
				bouncex.cookie.campaigns[campaignId].as = newCookie.campaigns[campaignId].as;
			}
		}
	}
	if (campaignAdded) {
		bouncex.setBounceCookie();
	}

	for (var campaignId in bouncex.campaigns) {
		if (bouncex.campaigns.hasOwnProperty(campaignId)) { //copy state vars
			if (newCampaigns[campaignId]) {
				newCampaigns[campaignId].ap = bouncex.campaigns[campaignId].ap;
				newCampaigns[campaignId].repressed = Boolean(bouncex.campaigns[campaignId].repressed);
			}

			if (newCampaigns[campaignId] &&
				bouncex.campaigns[campaignId].ad_visible &&
				newCampaigns[campaignId].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'') == bouncex.campaigns[campaignId].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'')) {
								newCampaigns[campaignId] = bouncex.campaigns[campaignId];
			} else if (newCampaigns[campaignId] && bouncex.isGbi2Campaign(campaignId) && bouncex.campaigns[campaignId].gbi.hasBegunAuction) {
								newCampaigns[campaignId] = bouncex.campaigns[campaignId];
			} else {
				bouncex.destroy_ad(campaignId);
			}
		}
	}

	bouncex.campaigns = newCampaigns;
	newCampaigns = {};

	bouncex.debug = false;
		bouncex.setBounceCookie();
	if (bouncex.campaigns) {
		for (var campaignId in bouncex.campaigns) {
			if (bouncex.campaigns[campaignId].ad_visible && typeof bouncex.repressCampaigns === 'function') {
				bouncex.repressCampaigns(campaignId);
			}
		}
		bouncex.loadBounceCss(bouncex.initActivationFuncs);
	}
		bouncex.loadBrandStyles();
	bouncex.loadWebfonts();

	})();
