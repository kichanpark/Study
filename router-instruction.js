importPackage(Packages.com.arreo.sylphid.mms.server.common);
importPackage(Packages.com.arreo.sylphid.platform);
importPackage(Packages.com.arreo.sylphid.platform.address);
importPackage(Packages.com.arreo.sylphid.platform.transmission);
importPackage(Packages.com.arreo.sylphid.platform.mms);
importClass(Packages.com.arreo.sylphid.sms.server.protocol.skt.SKTConstants);
importClass(Packages.com.arreo.sylphid.sms.server.protocol.ktf.KTFConstants);
importClass(Packages.com.arreo.sylphid.sms.server.protocol.lgt.LGTConstants);
//importClass(Packages.com.arreo.sylphid.platform.address.PhoneAddress);

importPackage(Packages.java.util);
importPackage(Packages.net.gleamynode.util);

var m = ctx.message;
var trace = m.trace;
var status = m.getStatus(Message.STATUS);
var address = ctx.getFromAddress();
var module = address.getModuleName();
var router = ctx.routerStatus;
var clientAddress = Address.parse(m.get(Message.CLIENT_ADDRESS));
var receiver = router.getModuleStatus(clientAddress);
var mmsConType = m.get(ShortMessage.MMS_CON_TYPE);
var assign_cd = m.get(ShortMessage.ASSIGN_CD);
var serviceCode = m.get(ShortMessage.SERVICE_CODE);
var groupCode = m.get(ShortMessage.GROUP_CODE);
var authSeq = clientAddress.getPassword();
//var	msg = m.get(ShortMessage.MESSAGE_CONTENTS);
//var id = m.get(Message.ID);

/*
// LG HelloVision
roundRobin.add(ctx.getLocalAddress("LghvSender5"));
roundRobin.add(ctx.getLocalAddress("LghvSender6"));

// SMTMT
roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
roundRobin.add(ctx.getLocalAddress("SmtntSender6"));

// Hanjin
roundRobin.add(ctx.getLocalAddress("HistSender1"));
roundRobin.add(ctx.getLocalAddress("HistSender2"));
roundRobin.add(ctx.getLocalAddress("HistSender3"));
roundRobin.add(ctx.getLocalAddress("HistSender4"));
roundRobin.add(ctx.getLocalAddress("HistSender5"));
roundRobin.add(ctx.getLocalAddress("HistSender6"));
roundRobin.add(ctx.getLocalAddress("HistSender13"));
roundRobin.add(ctx.getLocalAddress("HistSender14"));
roundRobin.add(ctx.getLocalAddress("HistSender15"));
roundRobin.add(ctx.getLocalAddress("HistSender16"));
roundRobin.add(ctx.getLocalAddress("HistSender17"));
roundRobin.add(ctx.getLocalAddress("HistSender18"));

// Wisecan
roundRobin.add(ctx.getLocalAddress("WiseCanSender7"));
roundRobin.add(ctx.getLocalAddress("WiseCanSender8"));

// UnionMC
roundRobin.add(ctx.getLocalAddress("UnionmcSender13"));
roundRobin.add(ctx.getLocalAddress("UnionmcSender14"));
roundRobin.add(ctx.getLocalAddress("UnionmcSender15"));
roundRobin.add(ctx.getLocalAddress("UnionmcSender16"));

// Lg Agent
roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));

// Kskybe
roundRobin.add(ctx.getLocalAddress("KsbAgentSender17"));
roundRobin.add(ctx.getLocalAddress("KsbAgentSender18"));
roundRobin.add(ctx.getLocalAddress("KsbAgentSender19"));

// Iheart
roundRobin.add(ctx.getLocalAddress("IheartLowSender09"));
roundRobin.add(ctx.getLocalAddress("IheartLowSender10"));
roundRobin.add(ctx.getLocalAddress("IheartLowSender11"));
roundRobin.add(ctx.getLocalAddress("IheartSender10"));
roundRobin.add(ctx.getLocalAddress("IheartSender11"));
roundRobin.add(ctx.getLocalAddress("IheartSender12"));

// NanoIT
roundRobin.add(ctx.getLocalAddress("NanoItNGSender9"));
roundRobin.add(ctx.getLocalAddress("NanoItNGSender10"));
roundRobin.add(ctx.getLocalAddress("NanoItNGSender11"));

// SKT Direct
roundRobin.add(ctx.getLocalAddress("MMSSKTSender28"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender29"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender30"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender31"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender32"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender33"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender34"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender35"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender36"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender37"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender38"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender39"));
roundRobin.add(ctx.getLocalAddress("MMSSKTSender40"));

// KTF Direct
roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));

// LGT Direct
roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
*/

//var reservedId = m.get(ShortMessage.RESERVED_ID);
var reservedId = m.get("reservedId");
var callback = m.get(ShortMessage.CALLBACK_ADDRESS);

function main() {
  if (module == "MMSReceiver") {
    if (reservedId != null && reservedId != "" && groupCode == "B000654") {
      log.warn("set group code to reservedId: " + reservedId);
      m.set(ShortMessage.GROUP_CODE, reservedId);
    }

    //if(groupCode == "B001858") {
    //			status = ShortMessageStatus.NOT_SUPPORTED_DESTINATION;
    //			m.setStatus(Message.STATUS,	Packages.com.arreo.sylphid.mms.server.common.ShortMessageStatus.NOT_SUPPORTED_DESTINATION);
    //}

    if (status == ShortMessageStatus.OK) {
      //var roundRobin = new RoundRobinTransmissionCommand();
      //roundRobin.add(ctx.getLocalAddress("SpamPersonFilter"));
      //roundRobin.add(ctx.getLocalAddress("SpamPersonFilter2"));
      //roundRobin.add(ctx.getLocalAddress("SpamPersonFilter3"));
      //roundRobin.add(ctx.getLocalAddress("SpamPersonFilter4"));
      //roundRobin.execute(ctx);
      ctx.transmit(address.toModuleAddress("MultiPNXFilter"));
    } else {
      logging();
    }
  } else if (module.match(/^SpamPersonFilter.*$/)) {
    if (status == ShortMessageStatus.OK) {
      ctx.transmit(address.toModuleAddress("MultiPNXFilter"));
    } else {
      logging();
    }
  } else if (module.match(/^MultiPNXFilter.*$/)) {
    if (
      status == ShortMessageStatus.OK ||
      status == Packages.com.arreo.sylphid.common.ShortMessageStatus.OK
    ) {
      m.setStatus(
        Message.STATUS,
        Packages.com.arreo.sylphid.mms.server.common.ShortMessageStatus.OK
      );

      var provider = PhoneAddress.getServiceProviderName(m, Message.TO_ADDRESS);

      log.info(
        "set group code to reservedId: " +
          reservedId +
          ", groupCode : " +
          groupCode
      );

      //Send To SKT
      if (provider.equals(MMSConstants.PROVIDER_SKT)) {
        if (groupCode == "B000981") {
          if (serviceCode == "HISTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "LGHTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LghvSender5"));
            roundRobin.add(ctx.getLocalAddress("LghvSender6"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "SMTTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else {
            ctx.transmit(address.toModuleAddress("MMSSKTSender28"));
          }
          // Special Callback
        } else if (checkSpecialCallback(groupCode, callback) == 1) {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender28"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender29"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender30"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender31"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender32"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender33"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender34"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender35"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender36"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender37"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender38"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender39"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender40"));
            roundRobin.execute(ctx);
          // SKT Direct 20GW
        } else if (
          groupCode == "B001805" ||
          groupCode == "B001781" ||
          groupCode == "B001311" ||
          groupCode == "B001701" ||
          groupCode == "B001948" ||
          groupCode == "B001967" ||
          groupCode == "B000717" ||
          groupCode == "B001031" ||
          groupCode == "B001979" ||
          groupCode == "B001327" ||
          groupCode == "B001278" ||
          groupCode == "B001856" ||
          groupCode == "B002078" ||
          groupCode == "B000849" || (groupCode == "B002042" && reservedId.match(/^B001135/))
        ) {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender28"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender29"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender30"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender31"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender32"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender33"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender34"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender35"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender36"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender37"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender38"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender39"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender40"));
            roundRobin.execute(ctx);
          // SKT Direct 19ADT
        } else if (
          groupCode == "B001897" &&
          (reservedId.match(/^B001933/) ||
            reservedId.match(/^B001889/) ||
            reservedId.match(/^B001994/) ||
            reservedId.match(/^B001870/) ||
            reservedId.match(/^B001931/) ||
            reservedId.match(/^B001878/))
        ) {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender28"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender29"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender30"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender31"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender32"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender33"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender34"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender35"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender36"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender37"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender38"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender39"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender40"));
            roundRobin.execute(ctx);
          // Hanjin 20GW
        } else if (
          groupCode == "B002029" ||
          groupCode == "B001911" ||
          groupCode == "B001595" ||
          groupCode == "B001817" ||
          groupCode == "B001172" ||
          groupCode == "B000869" ||
          groupCode == "B001963" ||
          groupCode == "B001950" ||
          groupCode == "B001164" ||
          groupCode == "B001399" ||
          groupCode == "B001991" ||
          groupCode == "B001898" ||
          groupCode == "B001965" ||
		      groupCode == "B002061" ||
          groupCode == "B002053" ||
          groupCode == "B001894" ||
          groupCode == "B001825"
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.add(ctx.getLocalAddress("HistSender13"));
            roundRobin.add(ctx.getLocalAddress("HistSender14"));
            roundRobin.add(ctx.getLocalAddress("HistSender15"));
            roundRobin.add(ctx.getLocalAddress("HistSender16"));
            roundRobin.add(ctx.getLocalAddress("HistSender17"));
            roundRobin.add(ctx.getLocalAddress("HistSender18"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // Hanjin 19ADT
        } else if (
          groupCode == "B001897" &&
          (reservedId.match(/^B001941/) ||
            reservedId.match(/^B001473/) ||
            reservedId.match(/^B002023/) ||
            reservedId.match(/^B001344/) ||
            reservedId.match(/^B001998/) ||
            reservedId.match(/^B001377/) ||
            reservedId.match(/^B002053/) ||
            reservedId.match(/^B002038/) ||
            reservedId.match(/^B002022/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.add(ctx.getLocalAddress("HistSender13"));
            roundRobin.add(ctx.getLocalAddress("HistSender14"));
            roundRobin.add(ctx.getLocalAddress("HistSender15"));
            roundRobin.add(ctx.getLocalAddress("HistSender16"));
            roundRobin.add(ctx.getLocalAddress("HistSender17"));
            roundRobin.add(ctx.getLocalAddress("HistSender18"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // UnionMC 20GW
        } else if (groupCode == "B002011" || groupCode == "B002002") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("UnionmcSender13"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender14"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender15"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender16"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
           // Iheart 20GW
        } else if (groupCode == "B002121" ||
                   groupCode == "B001935" ||
                   groupCode == "B001936" ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartSender10"));
            roundRobin.add(ctx.getLocalAddress("IheartSender11"));
            roundRobin.add(ctx.getLocalAddress("IheartSender12"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // kakaoenter 20GW
        } else if (groupCode == "B001999") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LghvSender5"));
            roundRobin.add(ctx.getLocalAddress("LghvSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // SMTMT 20GW
        } else if (groupCode == "B001896") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // SMTMT 19ADT
        } else if (
          groupCode == "B001897" &&
          (reservedId.match(/^B001396/) ||
            reservedId.match(/^B001970/) ||
            reservedId.match(/^B001974/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // KoreaAir
        } else if (
          groupCode == "B002029" ||
          (groupCode == "B001897" && reservedId.match(/^B000764/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
		// Default
		} else {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender28"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender29"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender30"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender31"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender32"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender33"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender34"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender35"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender36"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender37"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender38"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender39"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender40"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
        }
        //Send To KTF
      } else if (provider.equals(MMSConstants.PROVIDER_KTF)) {
        if (groupCode == "B000981") {
          if (serviceCode == "HISTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "LGHTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LghvSender5"));
            roundRobin.add(ctx.getLocalAddress("LghvSender6"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "SMTTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
            roundRobin.execute(ctx);
          }
          // Special Callback
        } else if (checkSpecialCallback(groupCode, callback) == 1) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
            roundRobin.execute(ctx);
          }
          // KTF Direct 20GW
        } else if (
          groupCode == "B001781" ||
          groupCode == "B001805" ||
          groupCode == "B001967" ||
          groupCode == "B000717" ||
          groupCode == "B001031" ||
          groupCode == "B001979" ||
          groupCode == "B001948" ||
          groupCode == "B001327" ||
          groupCode == "B001311" ||
          groupCode == "B001701" ||
          groupCode == "B001278" ||
          groupCode == "B001856" ||
          groupCode == "B002078" ||
          groupCode == "B000849" || (groupCode == "B002042" && reservedId.match(/^B001135/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
            roundRobin.execute(ctx);
          }
          // KTF Direct 19ADT
        } else if (
          groupCode == "B001897" &&
          (reservedId.match(/^B001870/) ||
            reservedId.match(/^B001933/) ||
            reservedId.match(/^B001889/) ||
            reservedId.match(/^B001994/) ||
            reservedId.match(/^B001878/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
            roundRobin.execute(ctx);
          }
          // Hanjin 20GW
        } else if (
          groupCode == "B002029" ||
          groupCode == "B001911" ||
          groupCode == "B001595" ||
          groupCode == "B001817" ||
          groupCode == "B001172" ||
          groupCode == "B000869" ||
          groupCode == "B001963" ||
          groupCode == "B001950" ||
          groupCode == "B001164" ||
          groupCode == "B001399" ||
          groupCode == "B001991" ||
          groupCode == "B001898" ||
          groupCode == "B001965" ||
		      groupCode == "B002061" ||
          groupCode == "B002053" ||
          groupCode == "B001894" ||
          groupCode == "B001825"
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.add(ctx.getLocalAddress("HistSender13"));
            roundRobin.add(ctx.getLocalAddress("HistSender14"));
            roundRobin.add(ctx.getLocalAddress("HistSender15"));
            roundRobin.add(ctx.getLocalAddress("HistSender16"));
            roundRobin.add(ctx.getLocalAddress("HistSender17"));
            roundRobin.add(ctx.getLocalAddress("HistSender18"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // Hanjin 19ADT
        } else if (
          groupCode == "B001897" &&
          (reservedId.match(/^B001941/) ||
            reservedId.match(/^B001473/) ||
            reservedId.match(/^B002023/) ||
            reservedId.match(/^B001344/) ||
            reservedId.match(/^B001998/) ||
            reservedId.match(/^B001377/) ||
            reservedId.match(/^B002053/) ||
            reservedId.match(/^B002038/) ||
            reservedId.match(/^B002022/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.add(ctx.getLocalAddress("HistSender13"));
            roundRobin.add(ctx.getLocalAddress("HistSender14"));
            roundRobin.add(ctx.getLocalAddress("HistSender15"));
            roundRobin.add(ctx.getLocalAddress("HistSender16"));
            roundRobin.add(ctx.getLocalAddress("HistSender17"));
            roundRobin.add(ctx.getLocalAddress("HistSender18"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // UnionMC 20GW
        } else if (groupCode == "B002011" || groupCode == "B002002") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("UnionmcSender13"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender14"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender15"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender16"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // Iheart 20GW
        } else if (groupCode == "B002121" ||
                   groupCode == "B001935" ||
                   groupCode == "B001936" ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartSender10"));
            roundRobin.add(ctx.getLocalAddress("IheartSender11"));
            roundRobin.add(ctx.getLocalAddress("IheartSender12"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // kakaoenter 20GW
        } else if (groupCode == "B001999") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LghvSender5"));
            roundRobin.add(ctx.getLocalAddress("LghvSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }          
          // SMTMT 20GW
        } else if (groupCode == "B001896") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // SMTMT 19ADT
        } else if (
          groupCode == "B001897" &&
          (reservedId.match(/^B001396/) ||
            reservedId.match(/^B001970/) ||
            reservedId.match(/^B001974/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // KoreaAir
        } else if (
          groupCode == "B002029" ||
          (groupCode == "B001897" && reservedId.match(/^B000764/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // Default
        } else {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
        }
        //Send To LGT
      } else if (provider.equals(MMSConstants.PROVIDER_LGT)) {
        if (groupCode == "B000981") {
          if (serviceCode == "HISTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "LGHTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LghvSender5"));
            roundRobin.add(ctx.getLocalAddress("LghvSender6"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "SMTTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "LGTTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
            roundRobin.execute(ctx);
          } else {
            ctx.transmit(address.toModuleAddress("LgAgentSender"));
          }
          // Special Callback
        } else if (checkSpecialCallback(groupCode, callback) == 1) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
            roundRobin.execute(ctx);
          }
          // LGT Direct 20GW
        } else if (
          groupCode == "B001805" ||
          groupCode == "B001948" ||
          groupCode == "B001967" ||
          groupCode == "B000717" ||
          groupCode == "B001031" ||
          groupCode == "B001979" ||
          groupCode == "B001311" ||
          groupCode == "B001701" ||
          groupCode == "B001327" ||
          groupCode == "B002078" ||
          groupCode == "B000849"
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
            roundRobin.execute(ctx);
          }
          // LGT Direct 19ADT
        } else if (
          groupCode == "B001897" &&
          (reservedId.match(/^B001878/) ||
            reservedId.match(/^B001933/) ||
            reservedId.match(/^B001889/) ||
            reservedId.match(/^B001870/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
            roundRobin.execute(ctx);
          }
          // Lg Agent 20GW
        } else if (
          groupCode == "B001781" ||
          groupCode == "B002002" ||
          groupCode == "B002040" ||
          groupCode == "B001278" ||
		      groupCode == "B001856" || (groupCode == "B002042" && reservedId.match(/^B001135/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
            roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
            roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // Lg Agent 19ADT
        } else if (
          groupCode == "B001897" &&
          (reservedId.match(/^B001878/) ||
            reservedId.match(/^B001994/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
            roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
            roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // Hanjin 20GW
        } else if (
          groupCode == "B002029" ||
          groupCode == "B001911" ||
          groupCode == "B001595" ||
          groupCode == "B001817" ||
          groupCode == "B001172" ||
          groupCode == "B000869" ||
          groupCode == "B001963" ||
          groupCode == "B001950" ||
          groupCode == "B001164" ||
          groupCode == "B001399" ||
          groupCode == "B001991" ||
          groupCode == "B001898" ||
          groupCode == "B001965" ||
          groupCode == "B001911" ||
		  groupCode == "B002061" ||
          groupCode == "B002053" ||
          groupCode == "B001894" ||
          groupCode == "B001825"
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.add(ctx.getLocalAddress("HistSender13"));
            roundRobin.add(ctx.getLocalAddress("HistSender14"));
            roundRobin.add(ctx.getLocalAddress("HistSender15"));
            roundRobin.add(ctx.getLocalAddress("HistSender16"));
            roundRobin.add(ctx.getLocalAddress("HistSender17"));
            roundRobin.add(ctx.getLocalAddress("HistSender18"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // Hanjin 19ADT
        } else if (
          groupCode == "B001897" &&
          (reservedId.match(/^B001941/) ||
            reservedId.match(/^B001473/) ||
            reservedId.match(/^B002023/) ||
            reservedId.match(/^B001344/) ||
            reservedId.match(/^B001998/) ||
            reservedId.match(/^B001377/) ||
            reservedId.match(/^B002053/) ||
            reservedId.match(/^B002038/) ||
            reservedId.match(/^B002022/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.add(ctx.getLocalAddress("HistSender13"));
            roundRobin.add(ctx.getLocalAddress("HistSender14"));
            roundRobin.add(ctx.getLocalAddress("HistSender15"));
            roundRobin.add(ctx.getLocalAddress("HistSender16"));
            roundRobin.add(ctx.getLocalAddress("HistSender17"));
            roundRobin.add(ctx.getLocalAddress("HistSender18"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // UnionMC 20GW
        } else if (groupCode == "B002011") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("UnionmcSender13"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender14"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender15"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender16"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // Iheart 20GW
        } else if (groupCode == "B002121" ||
                   groupCode == "B001935" ||
                   groupCode == "B001936"  ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartSender10"));
            roundRobin.add(ctx.getLocalAddress("IheartSender11"));
            roundRobin.add(ctx.getLocalAddress("IheartSender12"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // kakaoenter 20GW
        } else if (groupCode == "B001999") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LghvSender5"));
            roundRobin.add(ctx.getLocalAddress("LghvSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }          
          // SMTMT 20GW
        } else if (groupCode == "B001896") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // SMTMT 19ADT
        } else if (
          groupCode == "B001897" &&
          (reservedId.match(/^B001396/) ||
            reservedId.match(/^B001970/) ||
            reservedId.match(/^B001974/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // KoreaAir
        } else if (
          groupCode == "B002029" ||
          (groupCode == "B001897" && reservedId.match(/^B000764/))
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
          // Default
        } else {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
            roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender5"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender6"));
            roundRobin.execute(ctx);
          }
        }
      } else {
        logging();
      }
    } else {
      //ktũ�ν���[B001805]
      if (groupCode == "B001805" && status == ShortMessageStatus.LGT_URL_FAIL) {
        if (mmsConType == "100000") {
          var roundRobin = new RoundRobinTransmissionCommand();
          roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
          roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
          roundRobin.execute(ctx);
        } else {
          var roundRobin = new RoundRobinTransmissionCommand();
          roundRobin.add(ctx.getLocalAddress("IheartSender10"));
          roundRobin.add(ctx.getLocalAddress("IheartSender11"));
          roundRobin.add(ctx.getLocalAddress("IheartSender12"));
          roundRobin.execute(ctx);
        }
      } else {
        logging();
      }
    }
  } else if (module.match(/^.*(Sender.*|Sender_.*)$/)) {
    //2007.05.03. jubilie. ��ȣ�̵�	ó�� �߰�.
    if (groupCode == "B001184") {
      duzonPostProcess();
    } else if (groupCode == "B000981") {
      B000981_postProcess();
    } else {
      postProcess();
    }
  } else if (module.match(/^.*DatabaseLogger.*$/)) {
    if (
      status ==
      Packages.com.arreo.sylphid.mms.server.common.ShortMessageStatus.SUBMITTED
    ) {
      ctx.drop();
    } else {
      if (receiver != null) {
        ctx.transmit(receiver.address);
      } else {
        //	log.info("Report Not Send Message : "+ groupCode);
      }
    }
  }
}

//2007.05.03. jubilie. ��ȣ�̵�	ó�� �߰�.
function postProcess() {
  var done = false;
  var lastModuleName = m.getTrace().getLatest().getAddress().getModuleName();

  //Direct Direct	TEXT + JPG Image �̰�, ASSIGN_CD ��	0 �� ���???	Direct óHanjin, �̿ܿ���	HanjinHanjin�� Hanjin
  //	if (status == ShortMessageStatus.PORTED_OUT
  //          && mmsConType.substring(2,6).equals("0000")
  //          && assign_cd.equals(MMSConstants.ASSIGN_NO_CD)) {

  if (groupCode == "B001905" && serviceCode == "AAA15") {
    log.info(
      module +
        " >>> Do not resend if  groupCode == B001905 && serviceCode == AAA15"
    );
    done = true;
  } else if (
    module.match(/^.*(LgAgentSender.*|LgAgentSender_.*)$/) &&
    (status == ShortMessageStatus.IS_NOT_USER_BY_3RD_PARTY ||
      status == ShortMessageStatus.UNAVAILABLE_USER)
  ) {
    log.info(
      module + " >>> LgAgentSender : IS_NOT_USER_BY_3RD_PARTY, UNAVAILABLE_USER"
    );
    done = true;
  } else if (
    (status == ShortMessageStatus.PORTED_OUT ||
      status == ShortMessageStatus.IS_NOT_USER_BY_3RD_PARTY) &&
    mmsConType.substring(2, 6).equals("0000") &&
    assign_cd.equals(MMSConstants.ASSIGN_NO_CD)
  ) {
    if (!trace.containsWildcards("*/MMSSKTSender*")) {
      log.info("resend to SKT...");
      serviceProvider = MMSConstants.PROVIDER_SKT;
      m.remove(ShortMessage.SENDING_FLAG);

      var roundRobin = new RoundRobinTransmissionCommand();
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender28"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender29"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender30"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender31"));
      roundRobin.execute(ctx);
    } else if (!trace.containsWildcards("*/MMSKTFSender*")) {
      log.info("resend to KTF...");
      serviceProvider = MMSConstants.PROVIDER_KTF;
      m.remove(ShortMessage.SENDING_FLAG);

      var roundRobin = new RoundRobinTransmissionCommand();
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.execute(ctx);
    } else if (!trace.containsWildcards("*/MMSLGTSender*")) {
      log.info("resend to LGT...");
      serviceProvider = MMSConstants.PROVIDER_LGT;
      m.remove(ShortMessage.SENDING_FLAG);

      if (groupCode == "B001805") {
        var roundRobin = new RoundRobinTransmissionCommand();
        roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
        roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
        roundRobin.execute(ctx);
      } else {
        if (mmsConType == "100000") {
          var roundRobin = new RoundRobinTransmissionCommand();
          roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
          roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
          roundRobin.execute(ctx);
        } else {
          var roundRobin = new RoundRobinTransmissionCommand();
          //roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
          //roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
          //roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
          roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
          roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
          roundRobin.execute(ctx);
        }
      }
    } else {
      log.info("resend done...");
      //�� Hanjin Hanjin Hanjin	= ó�� ��
      done = true;
    }
  } else {
    done = true;
  }

  // ó��	�Ϸ�
  if (done) {
    logging();
  }
}

//2007.05.03. jubilie. ��ȣ�̵�	ó�� �߰�.
function B000981_postProcess() {
  var done = false;
  var lastModuleName = m.getTrace().getLatest().getAddress().getModuleName();

  //Direct Direct	TEXT + JPG Image �̰�, ASSIGN_CD ��	0 �� ���???	Direct óHanjin, �̿ܿ���	HanjinHanjin�� Hanjin
  //	if (status == ShortMessageStatus.PORTED_OUT
  //          && mmsConType.substring(2,6).equals("0000")
  //          && assign_cd.equals(MMSConstants.ASSIGN_NO_CD)) {

  if (
    module.match(/^.*(LgAgentSender.*|LgAgentSender_.*)$/) &&
    (status == ShortMessageStatus.IS_NOT_USER_BY_3RD_PARTY ||
      status == ShortMessageStatus.UNAVAILABLE_USER)
  ) {
    log.info(
      module + " >>> LgAgentSender : IS_NOT_USER_BY_3RD_PARTY, UNAVAILABLE_USER"
    );
    done = true;
  } else if (
    (status == ShortMessageStatus.PORTED_OUT ||
      status == ShortMessageStatus.IS_NOT_USER_BY_3RD_PARTY) &&
    mmsConType.substring(2, 6).equals("0000") &&
    assign_cd.equals(MMSConstants.ASSIGN_NO_CD)
  ) {
    if (!trace.containsWildcards("*/MMSSKTSender*")) {
      log.info("resend to SKT...");
      serviceProvider = MMSConstants.PROVIDER_SKT;
      m.remove(ShortMessage.SENDING_FLAG);

      var roundRobin = new RoundRobinTransmissionCommand();
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender28"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender29"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender30"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender31"));
      roundRobin.execute(ctx);
    } else if (!trace.containsWildcards("*/MMSKTFSender*")) {
      log.info("resend to KTF...");
      serviceProvider = MMSConstants.PROVIDER_KTF;
      m.remove(ShortMessage.SENDING_FLAG);

      var roundRobin = new RoundRobinTransmissionCommand();
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.execute(ctx);
    } else if (!trace.containsWildcards("*/MMSLGTSender*")) {
      log.info("resend to LGT...");
      serviceProvider = MMSConstants.PROVIDER_LGT;
      m.remove(ShortMessage.SENDING_FLAG);

      if (groupCode == "B001805") {
        var roundRobin = new RoundRobinTransmissionCommand();
        roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
        roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
        roundRobin.execute(ctx);
      } else {
        if (mmsConType == "100000") {
          //2016.08.26 LG�� Direct Iheart(0) : LGAgent(3)
          var roundRobin = new RoundRobinTransmissionCommand();
          roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
          roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
          roundRobin.execute(ctx);
        } else {
          var roundRobin = new RoundRobinTransmissionCommand();
          roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
          roundRobin.execute(ctx);
        }
      }
    } else {
      log.info("resend done...");
      //�� Hanjin Hanjin Hanjin	= ó�� ��
      done = true;
    }
  } else {
    done = true;
  }

  // ó��	�Ϸ�
  if (done) {
    logging();
  }
}

//2007.05.03. jubilie. ��ȣ�̵�	ó�� �߰�.
function duzonPostProcess() {
  var done = false;
  var lastModuleName = m.getTrace().getLatest().getAddress().getModuleName();
  if (
    module.match(/^.*(LgAgentSender.*|LgAgentSender_.*)$/) &&
    (status == ShortMessageStatus.IS_NOT_USER_BY_3RD_PARTY ||
      status == ShortMessageStatus.UNAVAILABLE_USER)
  ) {
    log.info(
      module + " >>> LgAgentSender : IS_NOT_USER_BY_3RD_PARTY, UNAVAILABLE_USER"
    );
    done = true;
  } else if (
    (status == ShortMessageStatus.PORTED_OUT ||
      status == ShortMessageStatus.IS_NOT_USER_BY_3RD_PARTY) &&
    mmsConType.substring(2, 6).equals("0000") &&
    assign_cd.equals(MMSConstants.ASSIGN_NO_CD)
  ) {
    if (!trace.containsWildcards("*/MMSSKTSender*")) {
      log.info("duzon resend to SKT...");
      serviceProvider = MMSConstants.PROVIDER_SKT;
      m.remove(ShortMessage.SENDING_FLAG);

      var roundRobin = new RoundRobinTransmissionCommand();
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender28"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender29"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender30"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender31"));
      roundRobin.execute(ctx);
    } else if (!trace.containsWildcards("*/MMSKTFSender*")) {
      log.info("duzon resend to KTF...");
      serviceProvider = MMSConstants.PROVIDER_KTF;
      m.remove(ShortMessage.SENDING_FLAG);

      var roundRobin = new RoundRobinTransmissionCommand();
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.execute(ctx);
    } else if (!trace.containsWildcards("*/MMSLGTSender*")) {
      log.info("duzon resend to LGT...");
      serviceProvider = MMSConstants.PROVIDER_LGT;
      m.remove(ShortMessage.SENDING_FLAG);

      if (groupCode == "B001805") {
        var roundRobin = new RoundRobinTransmissionCommand();
        roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
        roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
        //roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
        //roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
        //roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
        roundRobin.execute(ctx);
      } else {
        if (mmsConType == "100000") {
          //2016.08.26 LG�� Direct Iheart(0) : LGAgent(3)
          var roundRobin = new RoundRobinTransmissionCommand();
          roundRobin.add(ctx.getLocalAddress("MMSLGTSender13"));
          roundRobin.add(ctx.getLocalAddress("MMSLGTSender14"));
          roundRobin.execute(ctx);
        } else {
          var roundRobin = new RoundRobinTransmissionCommand();
          roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
          roundRobin.execute(ctx);
        }
      }
    } else {
      log.info("duzon resend done...");
      done = true;
    }
  } else {
    done = true;
  }

  // ó�� �Ϸ�
  if (done) {
    logging();
  }
}

function checkSpecialCallback(grpcd, callback) {
  var checkYN = 0;

  if (grpcd == "B000091") {
    if (
      callback == "0215888588" ||
      callback == "024307000" ||
      callback == "025147000" ||
      callback == "025345691" ||
      callback == "025670400" ||
      callback == "0317181100" ||
      callback == "0323262501" ||
      callback == "0424838100" ||
      callback == "0517537878" ||
      callback == "0518087471" ||
      callback == "0535877007" ||
      callback == "0622516000" ||
      callback == "15888588"
    ) {
      checkYN = 1;
    }
  } else if (grpcd == "B000777") {
    if (
      callback == "15442929" ||
      callback == "15445570" ||
      callback == "15773443" ||
      callback == "0215881600"
    ) {
      checkYN = 1;
    }
  } else if (grpcd == "B000854") {
    if (callback == "01043006593") {
      checkYN = 1;
    }
  } else if (grpcd == "B000938") {
    if (callback == "01071575027" || callback == "1390") {
      checkYN = 1;
    }
  } else if (grpcd == "B000981") {
    if (
      callback == "15442929" ||
      callback == "15888588" ||
      callback == "15997899"
    ) {
      checkYN = 1;
    }
  } else if (grpcd == "B001339") {
    if (callback == "15447004") {
      checkYN = 1;
    }
  } else if (grpcd == "B001647") {
    if (callback == "01027097418") {
      checkYN = 1;
    }
  } else if (grpcd == "B001805") {
    if (
      callback == "01033602974" ||
      callback == "01034016654" ||
      callback == "01047661223" ||
      callback == "01072205050" ||
      callback == "01074088500" ||
      callback == "01087220475" ||
      callback == "01093634449" ||
      callback == "01094435234" ||
      callback == "1332" ||
      callback == "1336" ||
      callback == "129"
    ) {
      checkYN = 1;
    }
  } else if (grpcd == "B001822") {
    if (
      callback == "01029466424" ||
      callback == "01033689721" ||
      callback == "01037864655" ||
      callback == "01097507788"
    ) {
      checkYN = 1;
    }
  } else if (grpcd == "B001889") {
    if (callback == "01071799277" || callback == "01089369293") {
      checkYN = 1;
    }
  } else if (grpcd == "B001948") {
    if (callback == "01021767018") {
      checkYN = 1;
    }
  } else if (grpcd == "B001893" || grpcd == "B000648" || grpcd == "B000481") {
    if (
      callback == "15881810" ||
      callback == "15880770" ||
      callback == "15881001" ||
      callback == "15880120" ||
      callback == "15881099" ||
      callback == "15997899" ||
      callback == "15996700" ||
      callback == "15990770" ||
      callback == "15883693" ||
      callback == "15882160" ||
      callback == "15881010" ||
      callback == "15775425"
    ) {
      checkYN = 1;
    }
  } else if (grpcd == "B001781") {
    if (
      callback == "129" ||
      callback == "1332" ||
      callback == "1336" ||
      callback == "1390"
    ) {
      checkYN = 1;
    }
  } else if (grpcd == "B001609") {
    if (
      callback == "02117" ||
      callback == "117" ||
      callback == "033117" ||
      callback == "182"
    ) {
      checkYN = 1;
    }
  } else if (grpcd == "B001184") {
    if (callback == "123") {
      checkYN = 1;
    }
  } else if (grpcd == "B002005") {
    if (callback == "114") {
      checkYN = 1;
    }
  }

  return checkYN;
}

/**
 * Database�� ���??? �ϱ�	Hanjin Hanjin
 */
function logging() {
  ctx.transmit(address.toModuleAddress("MMSDatabaseLogger1"));
}

main();
