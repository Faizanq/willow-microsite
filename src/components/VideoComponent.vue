<template>
  <div id="player" ref="player"></div>
</template>

<script>
import { defineComponent } from "vue";

import { onMounted, onUnmounted, ref } from "vue";
import { Player } from "bitmovin-player";
import { UIFactory } from "bitmovin-player-ui";

export default defineComponent({
  setup() {
    const player = ref(null);
    const playerConfig = {
      key: import.meta.env.VITE_BITMOVIN_PLAYER_LICENSE_KEY,
      playback: {
        muted: true,
        autoplay: true,
      },
    };
    const source = {
      dash: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
      hls: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
      progressive:
        "https://bitdash-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4",
      poster:
        "https://bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg",
    };

    const setupPlayer = () => {
      const playerInstance = new Player(
        document.getElementById("player"),
        playerConfig
      );

      const uiManager = UIFactory.buildModernUI(playerInstance);

      playerInstance.load(source).then(
        () => {
          player.value = playerInstance;
          console.log("Successfully loaded source");
        },
        () => {
          console.log("Error while loading source");
        }
      );
    };

    const destroyPlayer = () => {
      if (player.value) {
        player.value.destroy();
        player.value = null;
      }
    };

    onMounted(() => {
      setupPlayer();
    });

    onUnmounted(() => {
      destroyPlayer();
    });

    return {
      player,
    };
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Open Sans", sans-serif;
  color: #fff;
  font-weight: 300;
}

/* body {
    background: rgba(44, 131, 185, 1);
    background: -moz-linear-gradient(left, rgba(44, 131, 185, 1) 0%, rgba(30, 171, 227, 1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(44, 131, 185, 1)), color-stop(100%, rgba(30, 171, 227, 1)));
    background: -webkit-linear-gradient(left, rgba(44, 131, 185, 1) 0%, rgba(30, 171, 227, 1) 100%);
    background: -o-linear-gradient(left, rgba(44, 131, 185, 1) 0%, rgba(30, 171, 227, 1) 100%);
    background: -ms-linear-gradient(left, rgba(44, 131, 185, 1) 0%, rgba(30, 171, 227, 1) 100%);
    background: linear-gradient(to right, rgba(44, 131, 185, 1) 0%, rgba(30, 171, 227, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#2c83b9', endColorstr='#1eabe3', GradientType=1);
} */

#wrapper {
  background: url(../images/logo-bg-demopage.png);
  height: 100vh;
}

#banner {
  border-bottom: 1px solid #fff;
  background-color: #1eabe3;
  width: 100%;
}

#banner h1 {
  margin: 0;
  padding: 30px;
}

.logo {
  padding: 10px;
  width: 25%;
  min-width: 350px;
  float: left;
  margin: auto;
}

.title {
  width: 75%;
  white-space: nowrap;
}

.clear {
  clear: both;
}

.content {
  margin-bottom: 10em;
}

h1,
h2,
h3,
p {
  font-weight: 300;
  text-align: center;
  margin: 40px;
}

#player {
  max-width: 900px;
  width: 90%;
  margin: auto;
  -webkit-box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.75);
}

a {
  color: #97d9ef;
  font-weight: 400;
  text-decoration: none;
}

a:hover {
  color: #fff;
}

@media (max-width: 800px) {
  .logo {
    width: 100%;
  }

  .title {
    display: none;
  }
}
</style>
