/**
 * @module controller/scoreboardController
 */

/** @typedef {object} Event */

import {ScoreboardView} from '../Views/ScoreboardView/scoreboardView.js';
import {ScoreboardModel} from '../Models/scoreboardModel.js';

import {PaginatorModule} from '../Modules/paginator.js';
import {bus} from '../Modules/bus.js';
import {API} from './API/api.js';


/**
 * The class which connects functionality of scoreboard Model and View via proxy-functions.
 */
class ScoreboardController {
    /**
     * Create and link scoreboard Views with proxy-functions.
     */
    constructor() {
        this.scoreboardView = new ScoreboardView();

        this.scoreboardModel = new ScoreboardModel();

        this.paginator = new PaginatorModule();

        this.scoreboardView.onPaginatorLeft = this.onPaginatorLeft.bind(this);
        this.scoreboardView.onPaginatorRight = this.onPaginatorRight.bind(this);
        this.scoreboardView.onOpenPage = this.openPage.bind(this);
        this.scoreboardView.onLogout = this.logout.bind(this);
    }

    /**
     * Logout via userController.
     * @param evt - The event from html element.
     * @return {ScoreboardController} The current object instance.
     */
    logout(evt) {
        bus.emit(API.LOGOUT, [evt]);
        return this;
    }

    /**
     * Turn back the page.
     * @param {Event} evt - The event signalized turning one page back.
     */
    onPaginatorLeft(evt) {
        evt.preventDefault();

        const page = {
            page: this.paginator.decrement()
        };

        this.openPage(page);
    }

    /**
     * Turn next the page.
     * @param {Event} evt - The event signalized turning one page back.
     */
    onPaginatorRight(evt) {
        evt.preventDefault();

        const page = {
            page: this.paginator.increment()
        };

        this.openPage(page);
    }

    /**
     * Open the page by number.
     * @param {object<page number>} page - The object contains the page number.
     */
    openPage(page = { page : 1 }) {
        this.scoreboardModel.loadAllUsers(page).then( data => {
            this.paginator.maxPageNum = data['maxPageNum'];
            this.paginator.pageNum = page.page;
            data['paginator'] = this.paginator;
            bus.emit('scoreboard', [data, `/${page.page}`]);
        });
    }
}

export {ScoreboardController};