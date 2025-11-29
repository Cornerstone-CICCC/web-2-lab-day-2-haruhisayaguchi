$(function () {
  let id = 1;
  $("main h3").on("click", function () {
    $(this).next().slideToggle();
  })

  const load = function (id) {
    $.ajax({
      url: `https://dummyjson.com/users/${id}`,
      type: "GET",
      success: function (response) {
        $(".info__image").find("img").attr("src", response.image);
        $(".info__content").html(`
          <h2>${response.firstName} ${response.lastName}</h2>
          <p><b>Age:</b> ${response.age}</p>
          <p><b>Email:</b> ${response.email}</p>
          <p><b>Phone:</b> ${response.phone}</p>
        `)
        $(".posts h3")
          .text(`${response.firstName}'s Posts`)
        $.ajax({
          url: `https://dummyjson.com/users/${id}/posts`,
          type: "GET",
          success: function (response) {
            let html = "";
            if (response.posts.length === 0) html = "<li><p>User has no posts</p></li>"
            response.posts.forEach(post => (
              html += `
              <li>
                <h4>${post.title}</h4>
                <p>${post.body}</p>
                <span hidden>${post.id}</span>
              </li>
              `
            ))
            $(".posts ul").html(html)
            $(".posts ul li").on("click", function () {
              const id = $(this).children().last().text();
              $.ajax({
                url: `https://dummyjson.com/posts/${id}`,
                type: "GET",
                success: function (response) {
                  $("main").append(`
                    <div class="overlay">
                      <div class="modal">
                        <h2>${response.title}</h2>
                        <p>${response.body}</p>
                        <i>Views: ${response.views}</i>
                        <button>Close Modal</button>
                      </div>
                    </div>
                  `)
                  $(".modal button").on("click", function () {
                    $(".overlay").remove()
                  })
                }
              })
            })
          }
        })
        $(".todos h3")
          .text(`${response.firstName}'s To Dos`)
        $.ajax({
          url: `https://dummyjson.com/users/${id}/todos`,
          type: "GET",
          success: function (response) {
            let html = "";
            if (response.todos.length === 0) html = "<li><p>User has no todos</p></li>"
            response.todos.forEach(todo => (
              html += `
              <li>
              <p>${todo.todo}</p>
              </li>
              `
            ))
            $(".todos ul").html(html)
          }
        })
      }
    })
  }

  load(id);

  $("header").children().first().on("click", function () {
    id = id === 1 ? 30 : id - 1;
    load(id);
  })

  $("header").children().last().on("click", function () {
    id = id === 30 ? 1 : id + 1;
    load(id);
  })

})