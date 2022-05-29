const url = "https://api.lwd-temp.top/api/33reply.php";
var damoo = new Damoo('dm-screen', 'dm-canvas', 25);
var rpool = new Map();

function shoot(t) {
    damoo.play();
    damoo.emit({ text: t, color: "black" });
}

function gettxt(next) {
    axios({
        method: "GET",
        url: url + "?next=" + next,
    }).then(response => {
        rplys = response.data.data.replies;
        // next = response.data.data.cursor.next;
        // Append each.rpid:each.content.message to rpool
        for (var i = 0; i < rplys.length; i++) {
            id = rplys[i].rpid;
            msg = rplys[i].content.message;
            if (rpool.get(id) == undefined) {
                // If the rply is not in rpool, shoot & save it
                shoot(msg);
                rpool.set(id, msg);
                // console.log(msg);
            }
            // Delete older items in rpool if it's too big
            if (rpool.size > 200) {
                rpool.delete(rpool.keys().next().value);
            }
        }
    })
}

function st() {
    window.setInterval("gettxt('0')", 1000);
}
