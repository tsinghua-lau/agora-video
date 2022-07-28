<template>
  <div>
    <div class="box">
      <agora-video :appid='appid' :token="token" :channel="channel" :uid="uid"/>
    </div>
    <div id="remote-playerlist"></div>
  </div>
</template>

<script>
import AgoraVideo from './AgoraVideo.vue'
export default {
   components: {
   AgoraVideo
  },
  data() {
    return {
      appid:'303cfb9c7e6146978882ff85e63924f9',
      token:'006303cfb9c7e6146978882ff85e63924f9IABElWKJ+iAw9b6Rga7WyLJiIYK7RIfdXrtdcWDkPgx9hOsTtdsAAAAAEACOhaHHxUviYgEAAQDES+Ji', // 根据房间号生成的token(房间号和token对应)
      channel:'ceshi',
      
      uid:8848,
      client: null,
      localTracks: {
        videoTrack: null,
        audioTrack: null
      },
      remoteUsers: {},

      options: {
        appid: '',
        channel: '',
        uid: null,
        token: ''
      }
    }
  },
  mounted() {},
  methods: {
   async startVideo() {
      //初始化对象
      this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

      this.localTracks = {
        videoTrack: null,
        audioTrack: null
      }

      this.remoteUsers = {}

      // //对象数据
      this.options = {
        appid: '303cfb9c7e6146978882ff85e63924f9',
        channel: 'ceshi',
        uid: null,
        token:
          '006303cfb9c7e6146978882ff85e63924f9IACOKc7azCqZ8kV4i6N9SRHV0FM+qLpSadzJx5STZcWGoesTtdsAAAAAEAAtDEjTN5LfYgEAAQA3kt9i'
      }

      this.client.on('user-published', this.handleUserPublished)
      this.client.on('user-unpublished', this.handleUserUnpublished)[
        (this.options.uid, this.localTracks.audioTrack, this.localTracks.videoTrack)
      ] = await Promise.all([
        this.client.join(
          this.options.appid,
          this.options.channel,
          this.options.token || null
        ),
        // create local tracks, using microphone and camera
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack()
      ])

      this.localTracks.videoTrack.play('local-player')
      // $('#local-player-name').text(`localVideo(${options.uid})`)

      // publish local tracks to channel
      await this.client.publish(Object.values(this.localTracks))
      console.log('publish success')
    },

   async leaveVideo() {
      for (trackName in this.localTracks) {
        var track = this.localTracks[trackName]
        if (track) {
          track.stop()
          track.close()
          this.localTracks[trackName] = undefined
        }
      }

      // remove remote users and player views
      this.remoteUsers = {}
      $('#remote-playerlist').html('')
      await this.client.leave()
    },

   async subscribe(user, mediaType) {
      const uid = user.uid
      // subscribe to a remote user
      await this.client.subscribe(user, mediaType)
      console.log('subscribe success')
      if (mediaType === 'video') {
        const player = $(`
      <div id="player-wrapper-${uid}">
        <p class="player-name">remoteUser(${uid})</p>
        <div id="player-${uid}" class="player"></div>
      </div>
    `)
        $('#remote-playerlist').append(player)
        user.videoTrack.play(`player-${uid}`)
      }
      if (mediaType === 'audio') {
        user.audioTrack.play()
      }
    },

    handleUserPublished(user, mediaType) {
      const id = user.uid
      this.remoteUsers[id] = user
      this.subscribe(user, mediaType)
    },

    handleUserUnpublished(user) {
      const id = user.uid
      delete this.remoteUsers[id]
      $(`#player-wrapper-${id}`).remove()
    }
  }
}
</script>
<style scoped>
  .box{
    width: 500px;
    height:700px;
    border:1px solid red;
    margin:0 auto;
    margin-top: 50px;
  }
</style>
