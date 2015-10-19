import MVCEvent from "../../core/mvc/event/MVCEvent";
import EventDispatcher from "../../core/event/EventDispatcher";
import AbstractView from "../../core/mvc/AbstractView";

export default class ContactController extends EventDispatcher {
	
	private static routeList:Array<string> = ["contact"];
	
	private mContactView:AbstractView;
	
	constructor() {
		super();
		this.Init();
	}
	
	public Init():void {
		this.mContactView = new AbstractView();
		this.mContactView.AddEventListener(MVCEvent.TEMPLATE_LOADED, this.OnTemplateLoaded, this);
		this.mContactView.LoadTemplate("templates/contact/contact.html");
	}
	
	public Destroy():void {
		var scheduleHTMLElement:HTMLElement = document.getElementById("contactView");
		document.getElementById("core").removeChild(scheduleHTMLElement);
		
		this.mContactView.Destroy();
		this.mContactView = null;
	}
	
	public GetRouteList():Array<string> {
		return ContactController.routeList;
	}
	
	private OnTemplateLoaded(aEvent:MVCEvent):void {
		document.getElementById("core").innerHTML += this.mContactView.RenderTemplate({});
		this.mContactView.RemoveEventListener(MVCEvent.TEMPLATE_LOADED, this.OnTemplateLoaded, this);
	}
}