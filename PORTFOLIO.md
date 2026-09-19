![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

這是在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以純前端技術打造，提供日常待辦事項的新增、管理、篩選與保存功能，並透過 GitHub Copilot 的協作工具完成開發流程。

## 線上展示

[GitHub Pages](https://kaimin30192.github.io/GitHub-Bootcamp/)

> 請將上方網址中的 `<你的帳號>` 與 `<你的repo名稱>` 替換成實際的 GitHub 帳號與 Repository 名稱。

## 功能

- 新增待辦事項，空白內容不會被加入。
- 勾選待辦事項並顯示刪除線與淡化效果。
- 逐筆刪除待辦事項。
- 一次清除所有已完成事項，操作前會跳出確認對話框。
- 沒有已完成事項時停用「清除已完成」按鈕。
- 顯示整體清單的未完成事項數量。
- 清單為空或篩選結果為空時，顯示對應提示文字。
- 提供「全部」、「未完成」與「已完成」篩選。
- 支援淺色與深色模式切換，並顯示對應圖示與文字。
- 使用者手動選擇的主題會保存；尚未選擇時會跟隨作業系統的色彩偏好。
- 使用 `localStorage` 保存待辦資料與主題設定，重新整理後仍可保留。
- 支援手機螢幕的響應式版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何前端框架或外部套件。
- 不使用外部 CDN，可離線開啟與操作。
- 使用 CSS 變數集中管理介面顏色與主題配色。
- 使用 `localStorage` 保存待辦資料與使用者的主題偏好。
- 透過 `createElement`、`textContent` 與事件監聽建立及更新 DOM。

## 開發方式

- 使用 GitHub Copilot Agent Mode，根據需求逐步建立待辦清單的介面與互動功能。
- 使用 MCP 連接 Microsoft Learn，查詢 `prefers-color-scheme` 與網頁深色模式色彩對比等官方文件，作為主題與無障礙檢查的參考。
- 使用 GitHub MCP 讀取與整理 GitHub Issues，依照 Issue 內容建立修復分支、修改程式、驗證並建立 Pull Request。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義處理 GitHub Issue 的 agentic workflow，規範讀取 Issue、等待確認、建立分支、修改、驗證、提交推送與建立 PR 的順序。

## 我學到什麼

- 了解如何使用原生 JavaScript 管理 DOM、事件與應用程式狀態。
- 練習使用 `localStorage` 保存使用者資料，讓網頁重新整理後維持狀態。
- 學會使用 CSS 變數與 `prefers-color-scheme` 實作可切換且能跟隨系統設定的主題。
- 熟悉使用 GitHub Copilot Agent Mode、MCP 與提示檔案協助完成開發及文件查詢。
- 理解 GitHub Issue、分支、提交與 Pull Request 之間的協作流程。
