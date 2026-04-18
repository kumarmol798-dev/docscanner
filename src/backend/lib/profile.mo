import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/profile";

module {
  public func getProfile(
    userProfiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
  ) : ?Types.UserProfile {
    userProfiles.get(caller);
  };

  public func saveProfile(
    userProfiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    profile : Types.UserProfile,
  ) : () {
    userProfiles.add(caller, profile);
  };
};
