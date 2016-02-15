import MouseTouchEvent from "../../core/mouse/event/MouseTouchEvent";

import MVCEvent from "../../core/mvc/event/MVCEvent";
import AbstractView from "../../core/mvc/AbstractView";

import ConferenceModel from "../conference/ConferenceModel";
import Conference from "../conference/data/Conference";

import Profile from "./data/Profile"
import ProfileEvent from "./event/ProfileEvent";
import ProfilesController from "./ProfilesController";
import CompanyModel from "./CompanyModel";

import { Router } from "cortex-toolkit-js-router";

export default class SpeakerController extends ProfilesController {

	private mConferenceModel:ConferenceModel;
	private mCompanyModel:CompanyModel;

	private mSpeakerConference:Conference;
	protected mConferenceView:AbstractView;

	constructor() {
		super();
	}

	public Init():void {

		super.Init();

		this.mConferenceModel = ConferenceModel.GetInstance();
		this.mCompanyModel = CompanyModel.GetInstance();
		this.mNoSelectionClass = "profiles-selection-speakers";

		this.LoadSpeakers();
	}

	private LoadSpeakers():void{

		this.mTitle = "Découvrez les conférenciers de l'édition 2016, profondément inspirants.";
		this.mQuote = "« La connaissance est le début de l'action : l'action, l'accomplissement de la connaissance. »";
		this.mQuoteAuthor = "— Wang Young Ming";

        document.title = this.mHeaderText = "Conférenciers";
		this.mBackButtonText = "Découvrez nos autres conférenciers";
        this.mGridViewClass = "profiles-grid-speakers";

		if(this.mProfilesModel.IsSpeakersLoaded()) {

			this.OnDataReady(null);

		}else{

			this.mProfilesModel.AddEventListener(ProfileEvent.SPEAKERS_LOADED, this.OnDataReady, this);
			this.mProfilesModel.FetchSpeakers();
		}
	}

	protected OnDataReady(aEvent:MVCEvent) {

		this.mProfilesModel.RemoveEventListener(MVCEvent.JSON_LOADED, this.OnDataReady, this);

		this.mProfiles = this.mProfilesModel.GetSpeakers();

		if(this.mCompanyModel.IsLoaded()) {

			this.OnCompaniesLoaded(null);

		}else{

			this.mCompanyModel.AddEventListener(MVCEvent.JSON_LOADED, this.OnCompaniesLoaded, this);
			this.mCompanyModel.FetchCompanies();
		}
	}

	private OnCompaniesLoaded(aEvent:MVCEvent):void {

		this.mCompanyModel.RemoveEventListener(MVCEvent.JSON_LOADED, this.OnCompaniesLoaded, this);

		this.mProfilesView = new AbstractView();
		this.mProfilesView.AddEventListener(MVCEvent.TEMPLATE_LOADED, this.OnTemplateLoaded, this);
		this.mProfilesView.LoadTemplate("templates/profiles/profiles.html");

	}

	protected OnScreenClicked(aEvent:MouseTouchEvent):void {

		super.OnScreenClicked(aEvent);

		var element:HTMLElement = <HTMLElement>aEvent.currentTarget;

		if (element.id === this.mLink.id) {

			Router.GetInstance().Navigate("!"+this.mSpeakerConference.slug);
		}
	}

	protected OnTemplateLoaded(aEvent:MVCEvent):void {
		this.mConferenceView = new AbstractView();
		this.mConferenceView.AddEventListener(MVCEvent.TEMPLATE_LOADED, this.OnConferenceTemplateLoaded, this);
		this.mConferenceView.LoadTemplate("templates/profiles/profileSpeakerConference.html");
	}

	private OnConferenceTemplateLoaded(aEvent:MVCEvent):void {
		this.mConferenceView.RemoveEventListener(MVCEvent.TEMPLATE_LOADED, this.OnConferenceTemplateLoaded, this);
		super.OnTemplateLoaded(aEvent);
	}

	protected SetProfileDetails(aProfile:Profile):void {

		aProfile.subtitle = this.mCompanyModel.GetCompanyByID(aProfile.companyID).title;

		super.SetProfileDetails(aProfile);

		// Specific to speakers : conference informations
		this.mSpeakerConference = this.mConferenceModel.GetConferenceBySpeaker(aProfile);
		this.mLink.innerHTML = this.mConferenceView.RenderTemplate(this.mSpeakerConference);
	}
}
