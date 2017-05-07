const url = 'https://wedding.carvers.co/api'
import { browserHistory } from 'react-router'

// people saving
export const REQUEST_PEOPLE_UPDATE = 'REQUEST_PEOPLE_UPDATE'
export const RECEIVE_PEOPLE_UPDATE = 'RECEIVE_PEOPLE_UPDATE'

// people by party loading
export const REQUEST_PEOPLE_BY_PARTY = 'REQUEST_PEOPLE_BY_PARTY'
export const RECEIVE_PEOPLE_BY_PARTY = 'RECEIVE_PEOPLE_BY_PARTY'

// party by codeWord loading
export const REQUEST_PARTY_BY_CODE_WORD = 'REQUEST_PARTY_BY_CODE_WORD'
export const RECEIVE_PARTY_BY_CODE_WORD = 'RECEIVE_PARTY_BY_CODE_WORD'
export const RECEIVE_NOT_FOUND_CODE_WORD = 'RECEIVE_NOT_FOUND_CODE_WORD'

// set someone's +1
export const SET_PLUS_ONE_NAME = 'SET_PLUS_ONE_NAME'

// parties by ID loading
export const REQUEST_PARTIES = 'REQUEST_PARTIES'
export const RECEIVE_PARTIES = 'RECEIVE_PARTIES'

// people by ID loading
export const REQUEST_PEOPLE = 'REQUEST_PEOPLE'
export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE'

// login
export const SET_ADMIN_TOKEN = 'SET_ADMIN_TOKEN'

// server error encountered
export const RECEIVE_SERVER_ERROR = 'RECEIVE_SERVER_ERROR'
export const receiveServerError = (details) => ({
	type: RECEIVE_SERVER_ERROR,
	word: details.word,
	party: details.party,
	people: details.people,
})

export const setPlusOne = (guestOfID, name) => ({
	type: SET_PLUS_ONE_NAME,
	guestOfID,
	name
})

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

export const clearFilters = () => ({
	type: CLEAR_FILTERS,
})

export const setSortField = field => ({
	type: SET_SORT_FIELD,
	field
})

export const changeSortDir = () => ({
	type: CHANGE_SORT_DIR,
})

// Async persist people
export const requestPeopleUpdate = people => ({
	type: REQUEST_PEOPLE_UPDATE,
	people
})

export const receivePeopleUpdate = (people, json) => ({
	type: RECEIVE_PEOPLE_UPDATE,
	people,
	info: json.data,
	receivedAt: Date.now(),
})

export const updatePeople = (people, codeWord) => (dispatch, getState) => {
	dispatch(requestPeopleUpdate(people))
	return fetch(url+'/people', {
		method: "PUT",
		headers: new Headers({'Code-Word': codeWord}),
		body: JSON.stringify({people: people}),
		credentials: 'include',
		mode: 'cors'
	})
		.then(response => {
			if(response.headers.get('Content-Type') == 'application/json') {
				return response.json().then(resp => ({data: resp, response: response}))
			}
			return response.text().then(resp => ({data: resp, response: response}))
		})
		.then(response => {
			if (response.response.ok) {
				dispatch(receivePeopleUpdate(people, response.data))
				browserHistory.push('/rsvp/confirm')
			} else {
				console.log(response)
			}
		})
}

// Async fetch parties by codeWords
export const requestPartyByCodeWord = word => ({
  type: REQUEST_PARTY_BY_CODE_WORD,
  word,
})

export const receivePartyByCodeWord = (word, json) => {
	return {
		type: RECEIVE_PARTY_BY_CODE_WORD,
		word,
		party: json.parties[0],
		receivedAt: Date.now()
	}
}

export const receiveNotFoundCodeWord = (word, json) => {
	return {
		type: RECEIVE_NOT_FOUND_CODE_WORD,
		word,
		receivedAt: Date.now()
	}
}

const fetchPartyByCodeWord = word => dispatch => {
  dispatch(requestPartyByCodeWord(word))
	return fetch(url+`/parties?magic_word=`+word, {headers: new Headers({
		'Code-Word': word,
	}), credentials: 'include',
	mode: 'cors'})
		.then(response => {
			if(response.headers.get('Content-Type') == 'application/json') {
				return response.json().then(resp => ({data: resp, response: response}))
			}
			return response.text().then(resp => ({data: resp, response: response}))
		})
		.then(response => {
			if (response.response.ok) {
				dispatch(receivePartyByCodeWord(word, response.data))
			} else if (response.response.status == 404) {
				dispatch(receiveNotFoundCodeWord(word))
			} else {
				dispatch(receiveServerError({word: word}))
			}
		})
}

const shouldFetchPartyByCodeWord = (state, word) => {
	if (state.rsvp.fetching.codeWords[word]) {
		return false
	}
  const partyID = state.rsvp.codeWords[word]
  if (!partyID) {
    return true
	}
  return shouldFetchParties(state, [partyID.partyID])
}

export const fetchPartyByCodeWordIfNeeded = word => (dispatch, getState) => {
	if (shouldFetchPartyByCodeWord(getState(), word)) {
		return dispatch(fetchPartyByCodeWord(word))
  }
}

// Async fetch parties by ID (maybe)
export const requestParties = parties => ({
  type: REQUEST_PARTIES,
  parties,
})

export const receiveParties = (json) => {
	return {
		type: RECEIVE_PARTIES,
		parties: json.parties,
	}
}

const fetchParties = (parties, token) => dispatch => {
	dispatch(requestParties(parties))
	let u = url+`/parties?`
	if (parties) {
		parties.forEach(id => {
			u += 'party_id='+id+'&'
		})
	}
	return fetch(u, {headers: new Headers({
		'Authorization': 'Bearer '+token,
	}), credentials: 'include',
	mode: 'cors'})
		.then(response => {
			if(response.headers.get('Content-Type') == 'application/json') {
				return response.json().then(resp => ({data: resp, response: response}))
			}
			return response.text().then(resp => ({data: resp, response: response}))
		})
		.then(response => {
			if (response.response.ok) {
				dispatch(receiveParties(response.data))
			} else {
				dispatch(receiveServerError({parties: parties}))
			}
		})
}

const shouldFetchParties = (state, parties) => {
	if (parties.length < 1) {
		return true
	}
	let found = true
	parties.forEach(id => {
		if (!state.rsvp.fetching.parties[id]) {
			found = false
		}
	})
	return !found
}

export const fetchPartiesIfNeeded = (parties, token) => (dispatch, getState) => {
	if (shouldFetchParties(getState(), parties)) {
		return dispatch(fetchParties(parties, token))
  }
}

// Async fetch people by party
export const requestPeopleByParty = (party, codeWord) => ({
  type: REQUEST_PEOPLE_BY_PARTY,
	party,
	codeWord,
})

export const receivePeopleByParty = (party, json) => {
	let people = {}
	json.people.forEach(person => {
		people[person.ID] = person
	})
	return {
		type: RECEIVE_PEOPLE_BY_PARTY,
		party,
		people,
		receivedAt: Date.now()
	}
}

const fetchPeopleByParty = (party, codeWord) => dispatch => {
	dispatch(requestPeopleByParty(party, codeWord))
	let headers = new Headers()
	return fetch(url+`/people?party_id=`+party, {headers: new Headers({
		'Code-Word': codeWord,
	}), credentials: 'include',
	mode: 'cors'})
    .then(response => response.json())
    .then(json => dispatch(receivePeopleByParty(party, json)))
}

export const fetchPeopleByPartyIfNeeded = (party, codeWord) => (dispatch, getState) => {
	// TODO(paddy): cache this
	return dispatch(fetchPeopleByParty(party, codeWord))
}

// Async fetch people (maybe) by ID
export const requestPeople = (people) => ({
  type: REQUEST_PEOPLE,
	people,
})

export const receivePeople = (json) => {
	return {
		type: RECEIVE_PEOPLE,
		people: json.people,
	}
}

const fetchPeople = (people, token) => dispatch => {
	dispatch(requestPeople(people))
	let u = url+`/people?`
	if (people) {
		people.forEach(id => {
			u += 'person_id='+id+'&'
		})
	}
	return fetch(u, {headers: new Headers({
		'Authorization': 'Bearer '+token,
	}), credentials: 'include',
	mode: 'cors'})
	.then(response => {
		if(response.headers.get('Content-Type') == 'application/json') {
			return response.json().then(resp => ({data: resp, response: response}))
		}
		return response.text().then(resp => ({data: resp, response: response}))
	})
	.then(response => {
		if (response.response.ok) {
			dispatch(receivePeople(response.data))
		} else {
			dispatch(receiveServerError({parties: parties}))
		}
	})
}

const shouldFetchPeople = (state, people) => {
	if (people.length < 1) {
		return true
	}
	let found = true
	people.forEach(id => {
		if (!state.rsvp.fetching.people[id]) {
			found = false
		}
	})
	return !found
}

export const fetchPeopleIfNeeded = (people, token) => (dispatch, getState) => {
	if (shouldFetchPeople(getState(), people)) {
		return dispatch(fetchPeople(people, token))
  }
}

export const setAdminToken = (token) => (dispatch, getState) => {
	return dispatch({type: SET_ADMIN_TOKEN, token: token})
}
