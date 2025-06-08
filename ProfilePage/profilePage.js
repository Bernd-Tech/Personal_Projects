const likeBtn = document.getElementById("like-btn")
const followBtn = document.getElementById("follow-btn")
const followerStats = document.querySelectorAll(".follower-stats");

let liked = false;
let followed = false;

const giveLike = () => {
    let likesCount = parseInt(followerStats[2].textContent)
    // console.log(likesCount)
    if (!liked) {
        likesCount++;
        followerStats[2].textContent = likesCount;
        liked = true;
        likeBtn.style.color = "#ffffff"
        likeBtn.style.backgroundColor = "#73937E"
        // console.log("User gave Like")
    } else if (liked) {
        likesCount--;
        followerStats[2].textContent = likesCount;
        liked = false;
        likeBtn.style.color = ""
        likeBtn.style.backgroundColor = ""
        // console.log("User unliked")
    }
}

const follow = () => {
    let followerCount = parseInt(followerStats[0].textContent)

    if (!followed) {
        followerCount++;
        followerStats[0].textContent = followerCount;
        followed = true;
        followBtn.textContent = "Followed"
        followBtn.style.color = "#ffffff"
        followBtn.style.backgroundColor = "#73937E"
        alert("Thank you for the Support!")
        // console.log("User gave Like")
    } else if (followed) {
        followerCount--;
        followerStats[0].textContent = followerCount;
        followed = false;
        followBtn.textContent = "Follow"
        followBtn.style.color = ""
        followBtn.style.backgroundColor = ""
        alert("Daaaaaang, leaving so soon already?")
    }
}

likeBtn.addEventListener("click", giveLike)
followBtn.addEventListener("click", follow)
