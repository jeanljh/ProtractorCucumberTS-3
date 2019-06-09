import { $$, $ } from "protractor";

export class FlightsTabPO {
    rbTripOpts = $$('.radio>label>input');
    lbDepartDate = $('#departDate');
    lbReturnDate = $('#returnDate');
    tfPerson = $('#person');
    cbbCabinClass = $('#cabinClass');
    listCabinClass = $$('#cabinClass option')
    iconMinus = $$('.glyphicon-minus-sign');
    iconAdd = $$('.glyphicon-plus-sign');
    lbPerson = $$('.dropdown-menu li input');
    btnDone = $('.travelerClose');
    linkAdvancedOpt = $('#flightSearch .extra_text');
    tfReturnFromCity = $('#returnFroCity');
    tfReturnToCity = $('#returnToCity');
}