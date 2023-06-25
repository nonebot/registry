<script setup lang="ts">
import GithubButton from "./components/GithubButton.vue";
</script>

<template>
  <nav class="navbar bg-body-tertiary sticky-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img
          src="/logo.png"
          alt="Logo"
          width="30"
          height="30"
          class="d-inline-block align-text-top"
        />
        商店测试结果
      </a>
      <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
        <li class="nav-item">
          <GithubButton />
        </li>
        <li class="nav-item">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#result-statistics"
            aria-controls="result-statistics"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="bi bi-bar-chart-line"></span>
          </button>
        </li>
        <li class="nav-item" style="position: relative">
          <button
            id="bd-theme"
            class="navbar-toggler dropdown-toggle align-items-center"
            type="button"
            aria-expanded="false"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-label="Theme"
          >
            <span
              id="theme-toggle-icon"
              class="mdi mdi-theme-light-dark"
            ></span>
          </button>
          <ul
            class="dropdown-menu dropdown-menu-end"
            style="position: absolute; min-width: 5rem"
          >
            <li>
              <button
                type="button"
                class="dropdown-item"
                data-bs-theme-value="light"
              >
                <span class="mdi mdi-weather-sunny"></span>
                Light
              </button>
            </li>
            <li>
              <button
                type="button"
                class="dropdown-item"
                data-bs-theme-value="dark"
              >
                <span class="mdi mdi-weather-night"></span>
                Dark
              </button>
            </li>
            <li>
              <button
                type="button"
                class="dropdown-item"
                data-bs-theme-value="auto"
              >
                <span class="mdi mdi-theme-light-dark"></span>
                Auto
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="container">
      <div id="result-statistics" class="collapse" style="width: 100%">
        <div class="p-4">
          <h5 class="text-body-emphasis h4 lh-base">
            <span class="mdi mdi-chart-box-outline"> 测试统计 </span>
          </h5>
          <div class="fw-semibold">
            <span class="mdi mdi-check-decagram-outline">
              验证通过: <span id="total-check-pass">-</span>
            </span>
            <div
              class="progress"
              role="progressbar"
              aria-label="show-check-progress"
              aria-valuemin="0"
              aria-valuemax="100"
              style="height: 5px"
            >
              <div id="check-pass-progress" class="progress-bar"></div>
            </div>
          </div>
          <div class="text-body-secondary">
            <span class="mdi mdi-puzzle-check-outline">
              加载通过: <span id="total-load-pass">-</span>
            </span>
            <div
              class="progress"
              role="progressbar"
              aria-label="show-load-progress"
              aria-valuemin="0"
              aria-valuemax="100"
              style="height: 3px"
            >
              <div id="load-pass-progress" class="progress-bar"></div>
            </div>
          </div>
          <div class="text-body-secondary">
            <span class="mdi mdi-package-variant-closed-check">
              元数据存在: <span id="total-metadata-pass">-</span>
            </span>
            <div
              class="progress"
              role="progressbar"
              aria-label="show-metadata-progress"
              aria-valuemin="0"
              aria-valuemax="100"
              style="height: 3px"
            >
              <div id="metadata-pass-progress" class="progress-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <table
      id="table"
      data-show-columns="true"
      data-search="true"
      data-mobile-responsive="true"
      data-check-on-init="true"
      data-pagination="true"
    >
      <thead>
        <tr>
          <th
            data-field="id"
            data-sortable="true"
            data-visible="false"
            class="align-middle"
          >
            序号
          </th>
          <th
            data-field="project_link"
            data-formatter="projectFormatter"
            data-sortable="true"
            class="align-middle"
          >
            PyPI 项目名<br /><span class="mdi mdi-package package">包名</span>
          </th>
          <th
            data-field="author"
            data-formatter="authorFormatter"
            data-sortable="true"
            class="align-middle"
          >
            作者
          </th>
          <th
            data-field="valid"
            data-formatter="validFormatter"
            data-sortable="true"
            class="align-middle"
          >
            验证结果
          </th>
          <th
            data-field="run"
            data-formatter="runFormatter"
            data-sortable="true"
            class="align-middle"
          >
            加载结果
          </th>
          <th
            data-field="metadata"
            data-formatter="metadataFormatter"
            data-sortable="true"
            class="align-middle"
          >
            元数据
          </th>
          <th
            data-field="time"
            data-formatter="timeFormatter"
            data-sortable="true"
            class="align-middle"
          >
            测试时间
          </th>
        </tr>
      </thead>
    </table>
  </div>

  <button
    type="button"
    title="Scroll To Top"
    class="btn btn-light back-to-top"
    onclick="scrollToTop()"
  >
    <span class="mdi mdi-rocket text-primary"></span>
  </button>
</template>

<style scoped></style>
