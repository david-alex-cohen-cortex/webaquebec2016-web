import EConfig from "../main/EConfig";

import MVCEvent from "../../core/mvc/event/MVCEvent";
import EventDispatcher from "../../core/event/EventDispatcher";
import AbstractView from "../../core/mvc/AbstractView";

// import PlaceController from "./PlaceController"
import PlaceModel from "./PlaceModel"

export default class ContactController extends EventDispatcher {

	private mContactView:AbstractView;

	private mPlaceModel:PlaceModel;

    /*
	private mExploreRestaurants:PlaceController;
	private mExploreHotels:PlaceController;
	private mExploreParking:PlaceController;
	private mExploreShopping:PlaceController;

	private mExploreContainer:HTMLElement;
    */

	constructor() {
		super();
		this.Init();
	}

	public Init():void {

		this.mPlaceModel = PlaceModel.GetInstance();

		if(this.mPlaceModel.IsLoaded()){

			this.OnJSONLoaded(null);

		}else {

			this.mPlaceModel.AddEventListener(MVCEvent.JSON_LOADED, this.OnJSONLoaded, this);
			this.mPlaceModel.FetchPlaces()
		}
	}

	public Destroy():void {
		var scheduleHTMLElement:HTMLElement = document.getElementById("contact-view");
		document.getElementById("content-current").removeChild(scheduleHTMLElement);

		this.mContactView.Destroy();
		this.mContactView = null;
	}

	private OnJSONLoaded(aEvent:MVCEvent):void {

		this.mContactView = new AbstractView();
		this.mContactView.AddEventListener(MVCEvent.TEMPLATE_LOADED, this.OnTemplateLoaded, this);
		this.mContactView.LoadTemplate("templates/contact/contact.html");
	}

	private OnTemplateLoaded(aEvent:MVCEvent):void {

		document.getElementById("content-loading").innerHTML += this.mContactView.RenderTemplate({});
        document.getElementById("header-content-title").innerHTML = "<h1>Contact</h1>";
		this.mContactView.RemoveEventListener(MVCEvent.TEMPLATE_LOADED, this.OnTemplateLoaded, this);
		this.DispatchEvent(new MVCEvent(MVCEvent.TEMPLATE_LOADED));

		document.title = 'Contact' + EConfig.TITLE_SEPARATOR + EConfig.TITLE;

		//this.mExploreContainer = document.getElementById("contact-locations");
		//this.CreateControllers();
	}

    /*
	private CreateControllers():void {

		this.mExploreRestaurants = new PlaceController({
															name: "Restaurants",
															type:"resto",
															pathImage: "pin-restaurant",
															pathJson: "data-restaurants",
															containerId:1
														});

		this.mExploreHotels = new PlaceController({
														name: "Hôtels",
														type:"hotel",
														pathImage: "pin-hotel",
														pathJson: "data-hotels",
														containerId:2
													});

		this.mExploreParking = new PlaceController({
														name: "Stationnements",
														type:"parking",
														pathImage: "pin-parking",
														pathJson: "data-parkings",
														containerId:3
													});

		this.mExploreShopping = new PlaceController({
														name: "Magasins",
														type:"shop",
														pathImage: "pin-shop",
														pathJson: "data-shops",
														containerId:4
													});
	}
    */
}
