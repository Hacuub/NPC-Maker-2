const handleNPC = (e) => {
    e.preventDefault();

    $("#npcMessage").animate({width:'hide'}, 350);

    if($("#npcName").val() === '' || $("#npcGender").val() ==='' || $("#npcAge").val() ===''|| 
    $("#npcRace").val() ==='' || $("#npcClass").val() ===''|| $("#npcalignment").val() ===''
    || $("#npcLevel").val() ==='' || $("#npcDisposition").val() ===''|| $("#npcBackstory").val() ==='') {
        handleError("All fields are required");
        return false;
    }

    console.log($("#npcForm").serialize());

    sendAjax('POST', $("#npcForm").attr("action"), $("#npcForm").serialize(), function() {
        let csrfPassIn = $("#csrfID").val();
        ReactDOM.unmountComponentAtNode(document.querySelector("#makeNPC"));
        ReactDOM.render(
            <NPCForm csrf={csrfPassIn} />, document.querySelector("#makeNPC")
        );
        ReactDOM.render(
            <NPCPostSuccess />, document.querySelector("#success")
        );
        
    });

    return false;
};

function handleDelete(id, csrf) {
    const postData = `_csrf=${csrf}&_id=${id}`;
    console.log(postData);

    sendAjax('DELETE', '/delete', postData, function() {
        createAdminWindow();
    });

    return false;
};

function handleSearch() {
    const searchText = document.querySelector(".searchBarText").value.trim();
    const NPCSearchList = [];
    sendAjax('GET', '/getNPCs', null, (data) => {
        for(let i = 0; i < data.NPCs.length; i++){
            if(data.NPCs[i].name.includes(searchText)){
                NPCSearchList.push(data.NPCs[i]);
            }
        };
        ReactDOM.render(
            <NPCList NPCs={NPCSearchList}/>, document.querySelector("#NPCs")
        );
    });

    return false;
};

const NPCForm = (props) => {
    return (
        <form id="npcForm"
            onSubmit={handleNPC}
            name="npcForm"
            action="/maker"
            method="POST"
            className="npcForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="npcName" type="text" name="name" placeholder="NPC Name" />

            <label htmlFor="gender">Gender: </label>
            <input id="npcGender" type="text" name="gender" placeholder="NPC Gender" />

            <label htmlFor="age">Age: </label>
            <input id="npcAge" type="number" name="age" step="1" />

            <label htmlFor="race">Race: </label>
            <input id="npcRace" type="text" name="race" placeholder="NPC Race" />

            <label htmlFor="classNPC">Class: </label>
            <input id="npcClass" type="text" name="classNPC" placeholder="NPC Class" />

            <label htmlFor="alignment">Alignment: </label>
            <input id="npcAlignment" type="text" name="alignment" placeholder="NPC Alignment" />

            <label htmlFor="level">Level: </label>
            <input id="npcLevel" type="number" name="level" step="1" />

            <label htmlFor="disposition">Disposition: </label>
            <input id="npcDisposition" type="text" name="disposition" placeholder="NPC Disposition" />

            <label htmlFor="backstory">Backstory: </label>
            <input id="npcBackstory" type="text" name="backstory" placeholder="NPC Backstory" />

            <input type="hidden" id = "csrfID" name="_csrf" value={props.csrf} />
            <input className="makeNPCSubmit" type="submit" value="Submit  NPC" />
        </form>
    );
};

const NPCList = function(props) {
    if(props.NPCs.length === 0) {
        return(
            <div className="npcList">
                <h3 className="emptyNPC">No NPCs Yet</h3>
            </div>
        );
    }

    const npcNodes = props.NPCs.map(function(NPC){
        return (
            <div key={NPC._id} className="NPC">
                <h3 className="npcName">Name: {NPC.name} </h3>
                <h3 className="npcGender">Gender: {NPC.gender} </h3>
                <h3 className="npcAge">Age: {NPC.age} </h3>
                <h3 className="npcRace">Race: {NPC.race} </h3>
                <h3 className="npcClass">Class: {NPC.classNPC} </h3>
                <h3 className="npcAlignment">Alignment: {NPC.alignment} </h3>
                <h3 className="npcLevel">Level: {NPC.level} </h3>
                <h3 className="npcDisposition">Disposition: {NPC.disposition} </h3>
                <h3 className="npcBackstory">Backstory: {NPC.backstory} </h3>
            </div>
        );
    });

    return (
        <div className="npcList">
            {npcNodes}
        </div>
    );
};

const NPCListAdmin = function(input) {
    if(input.props.data.NPCs.length === 0) {
        return(
            <div className="npcList">
                <h3 className="emptyNPC">No NPCs Yet</h3>
            </div>
        );
    }

    const npcNodes = input.props.data.NPCs.map(function(NPC){
        return (
            <div key={NPC._id} className="NPC">
                <h3 className="npcName">Name: {NPC.name} </h3>
                <h3 className="npcGender">Gender: {NPC.gender} </h3>
                <h3 className="npcAge">Age: {NPC.age} </h3>
                <h3 className="npcRace">Race: {NPC.race} </h3>
                <h3 className="npcClass">Class: {NPC.classNPC} </h3>
                <h3 className="npcAlignment">Alignment: {NPC.alignment} </h3>
                <h3 className="npcLevel">Level: {NPC.level} </h3>
                <h3 className="npcDisposition">Disposition: {NPC.disposition} </h3>
                <h3 className="npcBackstory">Backstory: {NPC.backstory} </h3>
                <input className="npcDelete" type="button" value="Delete (WIP)" onClick={()=>handleDelete(NPC._id, input.props.csrf)} />
            </div>
        );
    });

    return (
        <div className="npcList">
            {npcNodes}
        </div>
    );
};

const RandomNPC = function(NPC) {
    if(NPC === null) {
        return(
            <div className="npcList">
                <h3 className="emptyNPC">No NPCs Yet</h3>
            </div>
        );
    }
    else{
        return (
            <div key={NPC._id} className="NPC">
                <h3 className="npcName">Name: {NPC.currentNPC.name} </h3>
                <h3 className="npcGender">Gender: {NPC.currentNPC.gender} </h3>
                <h3 className="npcAge">Age: {NPC.currentNPC.age} </h3>
                <h3 className="npcRace">Race: {NPC.currentNPC.race} </h3>
                <h3 className="npcClass">Class: {NPC.currentNPC.classNPC} </h3>
                <h3 className="npcAlignment">Alignment: {NPC.currentNPC.alignment} </h3>
                <h3 className="npcLevel">Level: {NPC.currentNPC.level} </h3>
                <h3 className="npcDisposition">Disposition: {NPC.currentNPC.disposition} </h3>
                <h3 className="npcBackstory">Backstory: {NPC.currentNPC.backstory} </h3>
            </div>
        );
    }
};

const SearchBar = function() {
    return (
    <div id="search">
        <input className = "searchBarText" type = "text" placeholder = "Search..."/>
        <input className="searchSubmit" type="submit" value="Search" onClick={()=>handleSearch()}/>
    </div>
    );
}

const NPCPostSuccess = function() {
    return (
    <div id = "postSuccess">
        <h3>NPC Created Successfully</h3>
    </div>
    );
};

const loadNPCsFromServer = () => {
    sendAjax('GET', '/getNPCs', null, (data) => {
        ReactDOM.render(
            <NPCList NPCs={data.NPCs} />, document.querySelector("#NPCs")
        );
    });
};

const createRandomWindow = () => {
    sendAjax('GET', '/getNPCs', null, (data) => {
        let randomNPC = Math.floor(Math.random() * (data.NPCs.length))
        ReactDOM.render(
            <RandomNPC currentNPC={data.NPCs[randomNPC]}/>, document.querySelector("#NPCs")
        );
        ReactDOM.unmountComponentAtNode(document.querySelector("#makeNPC"));
        ReactDOM.unmountComponentAtNode(document.querySelector("#searchBar"));
        ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
    });
};

const createSearchWindow = () => {
    ReactDOM.render(
        <SearchBar />, document.querySelector("#searchBar")
    );
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeNPC"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#NPCs"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
};

const createSubmitWindow = (csrf) => {
    ReactDOM.render(
        <NPCForm csrf={csrf} />, document.querySelector("#makeNPC")
    );
    ReactDOM.unmountComponentAtNode(document.querySelector("#NPCs"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#searchBar"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
};

const createAdminWindow = (csrf) => {
    sendAjax('GET', '/getNPCs', null, (data) => {
        let props = {data, csrf};
        ReactDOM.render(
            <NPCListAdmin props = {props} />, document.querySelector("#NPCs")
        );
        ReactDOM.unmountComponentAtNode(document.querySelector("#makeNPC"));
        ReactDOM.unmountComponentAtNode(document.querySelector("#searchBar"));
        ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
    });
};

const setup = function(csrf) {
    const randomButton = document.querySelector("#randomButton");
    const searchButton = document.querySelector("#searchButton");
    const submitButton = document.querySelector("#submitButton");
    const adminButton = document.querySelector("#adminButton");

    randomButton.addEventListener("click", (e) => {
        e.preventDefault();
        createRandomWindow();
        return false;
    });

    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSearchWindow();
        return false;
    });

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSubmitWindow(csrf);
        return false;
    });

    adminButton.addEventListener("click", (e) => {
        e.preventDefault();
        createAdminWindow(csrf);
        return false;
    });

    ReactDOM.render(
        <NPCList NPCs={[]} />, document.querySelector("#NPCs")
    );

    createRandomWindow();
};


const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});