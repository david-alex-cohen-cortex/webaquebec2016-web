import ComponentData from "../../../core/component/data/ComponentData";

import Profile from "../../profiles/data/Profile";

import TimeSlot from "./TimeSlot";
import SubjectType from "./SubjectType";
import Room from "./Room";

export default class Conference extends ComponentData {

	private mConferenceID:number;
	private mTitle:string;
	private mShortTitle:string;
	private mDescription:string;
	private mSlug:string;
	private mBreak:boolean;
	private mSpeakerID:number;
	private mSpeaker:Profile;
	private mSubjectTypeID:number;
	private mSubjectType:SubjectType;
	private mRoomID:number;
	private mRoom:Room;
	private mTimeSlotID:number;
	private mTimeSlot:TimeSlot;

	constructor() {
		super();
	}

	public get conferenceID():number { return this.mConferenceID; }
	public set conferenceID(aValue:number) { this.mConferenceID = aValue; }

	public get title():string { return this.mTitle; }
	public set title(aValue:string) { this.mTitle = aValue; }

	public get shortTitle():string { return this.mShortTitle; }
	public set shortTitle(aValue:string) { this.mShortTitle = aValue; }

	public get description():string { return this.mDescription; }
	public set description(aValue:string) { this.mDescription = aValue; }

	public get slug():string { return this.mSlug; }
	public set slug(aValue:string) { this.mSlug = aValue; }

	public get break():boolean { return this.mBreak; }
	public set break(aValue:boolean) { this.mBreak = aValue; }

	public get speakerID():number { return this.mSpeakerID; }
	public set speakerID(aValue:number) { this.mSpeakerID = aValue; }

	public get speaker():Profile { return this.mSpeaker; }
	public set speaker(aValue:Profile) { this.mSpeaker = aValue; }

	public get timeSlotID():number { return this.mTimeSlotID; }
	public set timeSlotID(aValue:number) { this.mTimeSlotID = aValue; }

	public get timeSlot():TimeSlot { return this.mTimeSlot; }
	public set timeSlot(aValue:TimeSlot) { this.mTimeSlot = aValue; }

	public get subjectTypeID():number { return this.mSubjectTypeID; }
	public set subjectTypeID(aValue:number) { this.mSubjectTypeID = aValue; }

	public get subjectType():SubjectType { return this.mSubjectType; }
	public set subjectType(aValue:SubjectType) { this.mSubjectType = aValue; }

	public get roomID():number { return this.mRoomID; }
	public set roomID(aValue:number) { this.mRoomID = aValue; }

	public get room():Room { return this.mRoom; }
	public set room(aValue:Room) { this.mRoom = aValue; }

	public FromJSON(aData:any):void {

		this.mConferenceID = aData.id;

		var div:HTMLElement = document.createElement("div")
		div.innerHTML = aData.title.rendered;
		this.mTitle = this.mShortTitle = div.textContent;

		/*if(this.mTitle.length > 90) {
			this.mShortTitle = this.mTitle.slice(0, 90) + "..."
		}*/

		this.mDescription = !aData.waq_meta.description ? aData.content.rendered : aData.waq_meta.description;
		this.mSlug = aData.slug;

		this.mBreak = aData.acf.is_not_session;

		this.mSpeakerID = aData.waq_meta._conferencer_speakers[0].split("\"")[1];
		this.mTimeSlotID = aData.waq_meta._conferencer_time_slot[0];
		this.mSubjectTypeID = aData.waq_meta._conferencer_track[0];
		this.mRoomID = aData.waq_meta._conferencer_room[0];
	}

}
