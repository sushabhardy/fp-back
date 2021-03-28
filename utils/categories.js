const CATEGORIES = {
  Actor: {
    id: 1,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profile-test.appspot.com/o/assets%2Fcategories%2FActor.jpg?alt=media&token=edf61b49-6f81-4666-8f80-99e9b9b2ded5'
  },
  Anchor: {
    id: 2,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fanchor.jpg?alt=media&token=2b7715fe-f760-49a1-a7d7-55986a48bfbb'
  },
  Host: {
    id: 2,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fanchor.jpg?alt=media&token=2b7715fe-f760-49a1-a7d7-55986a48bfbb'
  },
  Emcee: {
    id: 2,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fanchor.jpg?alt=media&token=2b7715fe-f760-49a1-a7d7-55986a48bfbb'
  },
  Artist: {
    id: 3,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fartist.craft.jpg?alt=media&token=5a8cd5ff-2e79-49d7-9391-30ef83538279'
  },
  Animator: {
    id: 4,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Faniamator.jpg?alt=media&token=25321ac9-692c-4654-81a4-6e85be98bd54'
  },
  'Ad Agency': {
    id: 5,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fadagency.jpg?alt=media&token=996fa7f4-e440-4091-8d59-b05b5bb2b349'
  },
  'Assistant Director': {
    id: 6,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fassdirector.jpg?alt=media&token=2f038900-5ab8-4f24-8b88-3bd5c1cd7728'
  },
  'Casting Manager': {
    id: 7,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fcastingmanager.jpg?alt=media&token=ee6b4527-904a-47e2-b9cd-98d3bae4ebd0'
  },
  Choreographer: {
    id: 8,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Faction-agility-balance-1701202.jpg?alt=media&token=f1d53d82-9509-4a31-b9f1-62def2b0c37f'
  },
  Comedian: {
    name: 9,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fcomic.jpg?alt=media&token=48661873-d12a-48c5-a437-4ce746fcd237'
  },
  Dancer: {
    id: 10,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fd.western.jpg?alt=media&token=f9a850bd-d55f-4d8d-a579-14ea9d5d7bef'
  },
  Director: {
    id: 12,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2FDirector.jpg?alt=media&token=b0140242-6ef7-4a19-8e46-c64f8aef07d6'
  },
  Writer: {
    id: 13,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fwriter.jpg?alt=media&token=1bb78b62-7880-48bd-bed4-b709166a256b'
  },
  'Dubbing Studio': {
    id: 14,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  'Fashion Designer': {
    id: 15,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  'Film Schools': {
    id: 16,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  'Graphic Designer': {
    id: 17,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fgraphic%20designer.jpg?alt=media&token=d03a3adb-90da-40a8-927e-715b937398af'
  },
  Journalist: {
    id: 18,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Flyrics.jpg?alt=media&token=019e0778-df06-4640-bf90-dc32d97f648e'
  },
  Lyricist: {
    id: 19,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Flyrics.jpg?alt=media&token=019e0778-df06-4640-bf90-dc32d97f648e'
  },
  'Make Up Artist': {
    id: 20,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fmake%20up%20artist.jpg?alt=media&token=61c0e2c1-daff-4c33-8d7e-8176a93fb1a4'
  },
  Model: {
    id: 21,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fmodel.jpg?alt=media&token=b06f073b-a86f-4b31-bf89-c9adc137e7a1'
  },
  Music: {
    id: 22,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fmusic.jpg?alt=media&token=2df79537-8580-41f6-b86c-1571b5f65273'
  },
  'Music Bands': {
    id: 23,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fm.band.jpg?alt=media&token=042e43ba-1f22-4ca5-ae4a-57615a403feb'
  },
  'Music Production': {
    id: 24,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fmusic.jpg?alt=media&token=2df79537-8580-41f6-b86c-1571b5f65273'
  },
  Photographer: {
    id: 26,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fphotographer.jpg?alt=media&token=796d33fc-e727-4656-840b-c26de2000cce'
  },
  Producer: {
    id: 27,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fproducer.jpg?alt=media&token=6e56bd72-c6fa-4af8-9be3-8f3ebb50b959'
  },
  'Production House': {
    id: 28,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fproduction%20house.jpg?alt=media&token=7e30d0cd-ee18-49f2-8376-2d9c605ab834'
  },
  'Radio Jockey': {
    id: 29,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fradio%20jocky.jpg?alt=media&token=26d82527-3629-49bd-9def-bc61f073606d'
  },
  Singer: {
    id: 30,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fsinger.jpg?alt=media&token=33c2d8f1-e86c-451e-a9b5-8717bed64d5f'
  },
  'Sound Engineer': {
    id: 31,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fsound%20engineer.jpg?alt=media&token=e167c6ad-bb04-4612-afa5-e67650733cda'
  },
  'Stunts And Fights': {
    id: 32,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fstuntmaster.jpg?alt=media&token=2394e1a1-8e59-442b-b872-c689fd085a24'
  },
  'Tattoo Artist': {
    id: 33,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Ftattoo.jpg?alt=media&token=af06c42b-e114-4ea0-b32c-9c30c5d9fb16'
  },
  'Tv Channels': {
    id: 34,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Ftv.satelite.jpg?alt=media&token=2fcac129-0f8a-440b-b0d9-849acaaf2d0e'
  },
  'Vfx Artist': {
    id: 36,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fvfx%20artist.jpg?alt=media&token=cadb14f3-9840-4bcf-8ac3-dcfbbfe1d357'
  },
  Cinematographer: {
    id: 37,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  'Video Editor': {
    id: 38,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fbroadcast-broadcasting-camcorder-66134.jpg?alt=media&token=a9a7cdee-472c-4a80-b6fd-64c9ae747e56'
  },
  'Director Of Photography ': {
    id: 39,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  'Costume Designer': {
    id: 40,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  Others: {
    id: 41,
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  }
}

export default CATEGORIES
