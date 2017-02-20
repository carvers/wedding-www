// party loading
export const REQUEST_PARTIES = 'REQUEST_PARTIES'
export const RECEIVE_PARTIES = 'RECEIVE_PARTIEs'

// people loading
export const REQUEST_PEOPLE = 'REQUEST_PEOPLE'
export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE'

// party by codeWord loading
export const REQUEST_PARTY_BY_CODE_WORD = 'REQUEST_PARTY_BY_CODE_WORD'
export const RECEIVE_PARTY_BY_CODE_WORD = 'RECEIVE_PARTY_BY_CODE_WORD'

// filter adjusting
export const SET_FILTER_NAME = 'SET_FILTER_NAME'
export const SET_FILTER_DIET = 'SET_FILTER_DIET'
export const SET_FILTER_STATUS = 'SET_FILTER_STATUS'
export const SET_SORT_FIELD = 'SET_SORT_FIELD'
export const CHANGE_SORT_DIR = 'CHANGE_SORT_DIR'
export const CLEAR_FILTERS = 'CLEAR_FILTERS'

export const setFilterName = name => ({
	type: SET_FILTER_NAME,
	name
})

export const setFilterDiet = diet => ({
	type: SET_FILTER_DIET,
	diet
})

export const setFilterStatus = status => ({
	type: SET_FILTER_STATUS,
	status
})

export const setSortField = field => ({
	type: SET_SORT_FIELD,
	field
})

export const changeSortDir = () => ({
	type: CHANGE_SORT_DIR,
})

// Async fetch parties
export const requestParties = parties => ({
  type: REQUEST_PARTY,
  parties,
})

export const receiveParties = (parties, json) => ({
  type: RECEIVE_PARTIES,
	parties,
  info: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchParties = parties => dispatch => {
  dispatch(requestParties(parties))
	return fetch(`http://api.wedding.carvers.house/parties?party_id=`+parties.join('&party_id='))
    .then(response => response.json())
    .then(json => dispatch(receiveParties(parties, json)))
}

const shouldFetchParty = (state, party) => {
  if (state.fetching.parties[party]) {
    return false
  }
  const info = state.parties[party]
  if (!info) {
    return true
  }
  return info.didInvalidate
}

const partiesToFetch = (state, parties) => {
	let toFetch = []
	for (party in parties) {
		if (shouldFetchParty(state, parties[party])) {
			toFetch.push(parties[party])
		}
	}
	return toFetch
}

export const fetchPartiesIfNeeded = parties => (dispatch, getState) => {
	const toFetch = partiesToFetch(getState(), parties)
	if (toFetch) {
		return dispatch(fetchParties(toFetch))
  }
}

// Async fetch parties by codeWords
export const requestPartyByCodeWord = word => ({
  type: REQUEST_PARTY_BY_CODE_WORD,
  word,
})

export const receivePartyByCodeWord = (word, json) => ({
  type: RECEIVE_PARTY_BY_CODE_WORD,
	word,
  info: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchPartyByCodeWord = word => dispatch => {
  dispatch(requestPartyByCodeWord(word))
	return fetch(`http://api.wedding.carvers.house/parties?code_word=`+word)
    .then(response => response.json())
    .then(json => dispatch(receivePartyByCodeWord(word, json)))
}

const shouldFetchPartyByCodeWord = (state, word) => {
	if (state.fetching.codeWords[word]) {
		return false
	}
  const partyID = state.codeWords[word]
  if (!partyID) {
    return true
	}
  return shouldFetchParty(state, partyID.partyID)
}

export const fetchPartyByCodeWordIfNeeded = word => (dispatch, getState) => {
	if (shouldFetchPartyByCodeWord(getState(), word)) {
		return dispatch(fetchPartyByCodeWord(word))
  }
}

// Async fetch people
export const requestPeople = people => ({
  type: REQUEST_PEOPLE,
  people,
})

export const receivePeople = (people, json) => ({
  type: RECEIVE_PEOPLE,
	people,
  info: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchPeople = people => dispatch => {
  dispatch(requestPeople(people))
	return fetch(`http://api.wedding.carvers.house/people?person_id=`+people.join('&person_id='))
    .then(response => response.json())
    .then(json => dispatch(receivePeople(people, json)))
}

const shouldFetchPerson = (state, person) => {
	if (state.fetching.people[person]) {
		return false
	}
  const info = state.person[person]
  if (!info) {
    return true
  }
  return info.didInvalidate
}

const peopleToFetch = (state, people) => {
	let toFetch = []
	for (person in people) {
		if (shouldFetchPerson(state, people[person])) {
			toFetch.push(people[person])
		}
	}
	return toFetch
}

export const fetchPeopleIfNeeded = people => (dispatch, getState) => {
	const toFetch = peopleToFetch(getState(), people)
	if (toFetch) {
		return dispatch(fetchPeople(toFetch))
  }
}