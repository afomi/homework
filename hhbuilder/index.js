// HOUSEHOLD BUILDER

function validateAge() {
  var ageField = document.querySelector("input[name='age']");
  var age = parseInt(ageField.value, 10);
  // NOTE: Validating integers is trickier than it looks
  // NOTE: Backend considerations must be considered
  //       to the extent the front-end doesn't catch edge cases like Hex #'s
  if (age >= 1) {
    return true;
  } else {
    alert("Please enter an 'Age' of 1 or older");
    return false;
  }
}

function validateRelationship() {
  var relationshipField = document.querySelector("select[name='rel']");
  var relationship = relationshipField.value;
  if (relationship == '') {
    alert("Please specify a Relationship")
    return false;
  } else {
    return true;
  }
}

// a Member row in the Household list
function personListElement(person) {
  var memberElement = document.createElement("template");
  memberElement.innerHTML = "<div class=\"member\">" + person.age + " year old " + person.relationship + " <button class=\"remove\" data-person-id=\"" + person.personDOMId + "\">Remove</button></div>";
  var fragment = memberElement.content.firstChild;

  var removeButton = fragment.getElementsByTagName("button")[0];
  removeButton.onclick = function(e) {
    var personId = removeButton.getAttribute("data-person-id");
    removePersonFromHousehold(person.personDOMId);
  }
  return fragment;
}

// Display the household list in the HTML as it is modified
function renderHouseholdMembersList() {
  document.getElementsByClassName("household")[0].innerHTML = '';
  householdMembers.forEach(function(member) {
    document.getElementsByClassName("household")[0].appendChild(personListElement(member));
  })
}

// Add people to a growing household list
function addPersonToHousehold() {
  var ageField = document.querySelector("input[name='age']");
  var age = parseInt(ageField.value, 10);
  var relationshipField = document.querySelector("select[name='rel']");
  var relationship = relationshipField.value;
  var smokerField = document.querySelector("input[name='smoker']");
  var smoker = smokerField.checked;

  householdMembersIncrementer = householdMembersIncrementer + 1
  person = {
    age: age,
    relationship: relationship,
    smoker: smoker,
    personDOMId: householdMembersIncrementer
  }
  householdMembers.push(person);

  renderHouseholdMembersList(person);
}

// Remove a previously added person from the list
function removePersonFromHousehold(personDOMId) {
  householdMembers = householdMembers.filter(function(member) {
    return member.personDOMId != personDOMId;
  });

  renderHouseholdMembersList();
}

// Display serialized JSON in the provided "debug" DOM element and display it
function displayFormRequest() {
  var debugElement = document.querySelector('.debug');
  var text = JSON.stringify({ members: householdMembers });
  debugElement.innerText = text;
  debugElement.style.display = "block";
}

function overrideFormBehaviors() {
  // Form Submission Behavior
  var form = document.querySelector('form');
  form.onsubmit = function(event) {
    event.preventDefault();

    if (householdMembers.length > 0) {
      displayFormRequest();
    }
    return false;
  }

  // Add Button Behavior
  var addButton = document.querySelector('button.add');
  addButton.onclick = function(event) {
    event.preventDefault();

    if (validateAge() && validateRelationship()) {
      addPersonToHousehold();
      form.reset();
    }
  }
}

var householdMembers = [];
var householdMembersIncrementer = 0; // Placeholder for UUID

overrideFormBehaviors();
