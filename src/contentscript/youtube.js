"use strict";

import { getLangOptionsWithLink, getTranscriptHTML } from "./transcript";
import { getSearchParam } from "./searchParam";
import { generateWorksheet } from "./api";

export function insertWorksheetBtn() {
    if (document.querySelector("#yt_worksheet_container")) {
        document.querySelector("#yt_worksheet_container").remove();
    }

    if (!getSearchParam(window.location.href).v) { return; }

    waitForElm('#secondary.style-scope.ytd-watch-flexy').then(() => {
        document.querySelector("#secondary.style-scope.ytd-watch-flexy").insertAdjacentHTML("afterbegin", `
            <div id="yt_worksheet_container" class="yt_worksheet_container">
                <div class="yt_worksheet_header">
                    <h3>Interactive Worksheet Generator</h3>
                    <div class="yt_worksheet_actions">
                        <button id="generateWorksheetBtn" class="yt_worksheet_btn">Generate Worksheet</button>
                        <button id="exportPdfBtn" class="yt_worksheet_btn" style="display: none;">Export PDF</button>
                        <button id="shareBtn" class="yt_worksheet_btn" style="display: none;">Share</button>
                    </div>
                </div>
                <div id="yt_worksheet_content" class="yt_worksheet_content">
                    <div id="yt_worksheet_lang_select"></div>
                    <div id="yt_worksheet_text"></div>
                </div>
            </div>
        `);

        setupEventListeners();
    });
}

async function setupEventListeners() {
    const generateBtn = document.querySelector("#generateWorksheetBtn");
    const exportBtn = document.querySelector("#exportPdfBtn");
    const shareBtn = document.querySelector("#shareBtn");

    generateBtn.addEventListener("click", async () => {
        const videoId = getSearchParam(window.location.href).v;
        const langOptions = await getLangOptionsWithLink(videoId);
        
        if (!langOptions) {
            showNoTranscriptMessage();
            return;
        }

        showLoadingState();
        
        try {
            const transcript = await getTranscriptHTML(langOptions[0].link, videoId);
            const worksheet = await generateWorksheet(transcript);
            displayWorksheet(worksheet);
            exportBtn.style.display = "block";
            shareBtn.style.display = "block";
        } catch (error) {
            showError(error);
        }
    });

    exportBtn.addEventListener("click", () => exportWorksheetPDF());
    shareBtn.addEventListener("click", () => shareWorksheet());
}

function showLoadingState() {
    document.querySelector("#yt_worksheet_text").innerHTML = `
        <div class="yt_worksheet_loading">
            <p>Generating worksheet...</p>
            <div class="loader"></div>
        </div>
    `;
}

function showNoTranscriptMessage() {
    document.querySelector("#yt_worksheet_text").innerHTML = `
        <div class="yt_worksheet_error">
            <p>No transcript available for this video.</p>
            <p>Please try another video with closed captions enabled.</p>
        </div>
    `;
}

function showError(error) {
    document.querySelector("#yt_worksheet_text").innerHTML = `
        <div class="yt_worksheet_error">
            <p>Error generating worksheet:</p>
            <p>${error.message}</p>
        </div>
    `;
}

function displayWorksheet(worksheet) {
    document.querySelector("#yt_worksheet_text").innerHTML = worksheet;
}

async function exportWorksheetPDF() {
    const content = document.querySelector("#yt_worksheet_text").innerHTML;
    // Implementation for PDF export will be handled by pdf.js
}

async function shareWorksheet() {
    const videoId = getSearchParam(window.location.href).v;
    // Implementation for sharing functionality
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}