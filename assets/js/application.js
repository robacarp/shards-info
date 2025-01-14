$(function () {
  if (!('theme' in localStorage)) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
  }

  const themeSwitcherElement = document.getElementById('themeSwitcher')

  if (localStorage.theme === 'dark') {
    themeSwitcherElement.setAttribute('data-checked', true)
    themeSwitcherElement.innerHTML = '<i class="fas fa-moon"></i>'
  } else {
    themeSwitcherElement.setAttribute('data-checked', false)
    themeSwitcherElement.innerHTML = '<i class="fas fa-sun"></i>'
  }

  themeSwitcherElement.addEventListener('click', function () {
    const isChecked = this.getAttribute('data-checked') === 'true'
    this.setAttribute('data-checked', !isChecked)
    this.innerHTML = isChecked ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'

    if (!isChecked) {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
  })

  // navigate to a tab when the history changes
  window.addEventListener('popstate', function (e) {
    const hash = window.location.hash
    const activeTab = $('.nav a[href="' + hash + '"]')

    if (activeTab.length) {
      activeTab.tab('show')
    } else {
      $('.nav-tabs a:first').tab('show')
    }
  })

  $('form#search').on('submit', function (e) {
    e.preventDefault()
    const query = $(e.target).find("input[name='query']").val().replace(/\s/g, '+')
    window.location.href = '/search?query=' + encodeURIComponent(query)
  })

  $('.js-action').on('click', function (e) {
    e.preventDefault()
    const url = e.currentTarget.dataset.href
    const method = e.currentTarget.dataset.method

    $.ajax({
      url,
      method,
      data: {},
      success: function (resp) {
        window.location.href = resp.data.redirect_url
      }
    })
  })

  const sidebarModal = document.getElementById('sidebar-modal')
  const searchInput = sidebarModal.querySelector("input[name='query']")

  sidebarModal.addEventListener('show.bs.modal', () => {
    setTimeout(() => {
      searchInput.focus()
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length)
    }, 500)
  })

  $(function () {
    const hash = window.location.hash
    hash && $('.nav a[href="' + hash + '"]').tab('show')

    // add a hash to the URL when the user clicks on a tab
    $('.home_repositories__container .nav-tabs a').on('click', function (e) {
      history.pushState(null, null, $(this).attr('href'))
      const scrollmem = $('body').scrollTop()
      $('html,body').scrollTop(scrollmem)
    })

    $('.shard__readme a.anchor').on('click', function (e) {
      e.preventDefault()
      window.location.replace(this.hash)
    })

    // Back To Top Button
    if ($('#back-to-top').length) {
      const scrollTrigger = 100 // px
      const backToTop = function () {
        const scrollTop = $(window).scrollTop()
        if (scrollTop > scrollTrigger) {
          $('#back-to-top').addClass('show')
        } else {
          $('#back-to-top').removeClass('show')
        }
      }
      backToTop()
      $(window).on('scroll', function () {
        backToTop()
      })
    }

    $('.shard__readme li:has(input)').addClass('checklist-item')
  })

  const moveTo = new window.MoveTo()
  const trigger = $('#back-to-top')
  moveTo.registerTrigger(trigger[0])

  const pagesCount = $('#pagination').data('pagesCount')
  const currentPage = $('#pagination').data('currentPage')
  const $pagination = $('#pagination')

  $pagination.twbsPagination({
    totalPages: pagesCount,
    startPage: currentPage,
    visiblePages: 7,
    href: true,
    pageVariable: 'page',
    prev: '&laquo;',
    next: '&raquo;',
    first: '',
    last: '',
    onPageClick: function (event, page) {}
  })

  // initialize all tooltips on a page
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new window.bootstrap.Tooltip(tooltipTriggerEl)
  })

  // initialize all popovers on a page
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new window.bootstrap.Popover(popoverTriggerEl)
  })
})

// Executed upon page load
document.addEventListener('DOMContentLoaded', function () {
  scrollToHash()
})

// This function enables automatic page scrolling to a specific anchor in the "readme" section upon page load.
function scrollToHash () {
  const hash = window.location.hash

  if (hash) {
    const element = document.querySelector('#readme ' + hash)

    if (element) {
      // Scroll the page to bring the element into view.
      // In browsers that support it, the scroll will be smooth.
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
