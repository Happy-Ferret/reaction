export function getUser(user: User | null | undefined): User | null {
  let _user = user

  if (_user === undefined) {
    const id = process.env.USER_ID
    const accessToken = process.env.USER_ACCESS_TOKEN
    const labFeatures = process.env.USER_LAB_FEATURES

    if (id && accessToken) {
      _user = {
        id,
        accessToken,
      }

      if (labFeatures) {
        _user.lab_features = labFeatures.split(",")
      }
    }
  }

  return _user
}
