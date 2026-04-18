import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/profile";
import ProfileLib "../lib/profile";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, Types.UserProfile>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?Types.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProfileLib.getProfile(userProfiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : Types.UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProfileLib.saveProfile(userProfiles, caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?Types.UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    ProfileLib.getProfile(userProfiles, user);
  };
};
