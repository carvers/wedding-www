import { combineReducers } from 'redux'

import { SET_FILTER_NAME, SET_FILTER_DIET, SET_FILTER_STATUS, CLEAR_FILTERS,
	       SET_SORT_FIELD, CHANGE_SORT_DIR,
				 REQUEST_PARTIES, RECEIVE_PARTIES,
				 REQUEST_PEOPLE, RECEIVE_PEOPLE,
				 REQUEST_PARTY_BY_CODE_WORD, RECEIVE_PARTY_BY_CODE_WORD,
				 REQUEST_PEOPLE_BY_PARTY, RECEIVE_PEOPLE_BY_PARTY,
} from '../actions'

const initialState = {
	people: {},
	parties: {},
	codeWords: {},
	fetching: {
		parties: {},
		people: {},
		codeWords: {},
	},
	codeWord: '',
	filters: {
		name: '',
		diet: '',
		status: '',
	},
	sort: {
		field: '',
		dir: 1,
	}
}

function parties(state = initialState.parties, action) {
	switch(action.type) {
					case RECEIVE_PARTIES:
									fetchedParties = {}
									action.parties.forEach(party => {
										fetchedParties[party.ID] = party
									})
									return Object.assign({}, state, {parties: fetchedParties})
					case RECEIVE_PARTY_BY_CODE_WORD:
									return Object.assign({}, state, {[action.party.ID]: action.party})
					default:
									return state
	}
}

function people(state = initialState.people, action) {
	switch (action.type) {
					case RECEIVE_PEOPLE:
					case RECEIVE_PEOPLE_BY_PARTY:
									return Object.assign({}, state, action.people)
					default:
									return state
	}
}

function codeWords(state = initialState.codeWords, action) {
	switch (action.type) {
					case RECEIVE_PARTY_BY_CODE_WORD:
									return Object.assign({}, state, {[action.word]: {partyID: action.party.ID}})
					default:
									return state
	}
}

function codeWord(state = initialState.codeWord, action) {
	switch (action.type) {
					case RECEIVE_PARTY_BY_CODE_WORD:
									return action.word
					default:
									return state
	}
}

function fetching(state = initialState.fetching, action) {
	switch (action.type) {
					case REQUEST_PEOPLE:
									fetchingPeople = {}
									for(person in action.paeople) {
										fetchingPeople[person] = true
									}
									return Object.assign({}, state, {people: fetchingPeople})
					case RECEIVE_PEOPLE:
									fetchingPeople = {}
									for(person in action.paeople) {
										fetchingPeople[person] = false 
									}
									return Object.assign({}, state, {people: fetchingPeople})
					case REQUEST_PARTIES:
									parties = {}
									action.parties.forEach(party => {
										parties[party] = true
									})
									return Object.assign({}, state, {parties: parties})
					case RECEIVE_PARTIES:
									parties = {}
									action.parties.forEach(party => {
										parties[party] = false 
									})
									return Object.assign({}, state, {parties: parties})
					case REQUEST_PARTY_BY_CODE_WORD:
									return Object.assign({}, state, {codeWords: {[action.word]: true}})
					case RECEIVE_PARTY_BY_CODE_WORD:
									return Object.assign({}, state, {codeWords: {[action.word]: false}})
					case REQUEST_PEOPLE_BY_PARTY:
									return Object.assign({}, state, {parties: {[action.party]: true}})
					case RECEIVE_PEOPLE_BY_PARTY:
									return Object.assign({}, state, {parties: {[action.party]: false}})
					default:
									return state
	}

}

function filters(state = initialState.filters, action) {
	switch (action.type) {
					case SET_FILTER_NAME:
									return Object.assign({}, state, {name: action.name})
					case SET_FILTER_DIET:
									return Object.assign({}, state, {diet: action.diet})
					case SET_FILTER_STATUS:
									return Object.assign({}, state, {status: action.status})
					case CLEAR_FILTERS:
									return Object.assign({}, state, {name: '', diet: '', status: ''})
					default:
									return state
	}
}

function sort(state = initialState.sort, action) {
	switch (action.type) {
					case SET_SORT_FIELD:
									return Object.assign({}, state, {field: action.field, dir: 1})
					case CHANGE_SORT_DIR:
									return Object.assign({}, state, {dir: state.dir * -1})
					default:
									return state
	}
}

const weddingApp = combineReducers({
	parties,
	people,
	codeWord,
	codeWords,
	fetching,
	filters,
	sort,
})

export default weddingApp
