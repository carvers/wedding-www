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
  return shouldFetchParty(state, partyID.partyID)
}

export const fetchPartyByCodeWordIfNeeded = word => (dispatch, getState) => {
	if (shouldFetchPartyByCodeWord(getState(), word)) {
		return dispatch(fetchPartyByCodeWord(word))
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
