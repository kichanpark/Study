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
//var id = m.get(Message.ID);

var reservedId = m.get(ShortMessage.RESERVED_ID);
var callback = m.get(ShortMessage.CALLBACK_ADDRESS);

/*
// SMTMT
roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
roundRobin.add(ctx.getLocalAddress("SmtntSender2"));

// LgHello
roundRobin.add(ctx.getLocalAddress("LghvSender1"));
roundRobin.add(ctx.getLocalAddress("LghvSender2"));

// Hanjin
roundRobin.add(ctx.getLocalAddress("HistSender1"));
roundRobin.add(ctx.getLocalAddress("HistSender2"));
roundRobin.add(ctx.getLocalAddress("HistSender3"));
roundRobin.add(ctx.getLocalAddress("HistSender4"));
roundRobin.add(ctx.getLocalAddress("HistSender5"));
roundRobin.add(ctx.getLocalAddress("HistSender6"));

// Wisecan
roundRobin.add(ctx.getLocalAddress("WiseCanSender3"));
roundRobin.add(ctx.getLocalAddress("WiseCanSender4"));

// UnionMC
roundRobin.add(ctx.getLocalAddress("UnionmcSender5"));
roundRobin.add(ctx.getLocalAddress("UnionmcSender6"));
roundRobin.add(ctx.getLocalAddress("UnionmcSender7"));
roundRobin.add(ctx.getLocalAddress("UnionmcSender8"));

// Lg Agent
roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));

// kskybe
roundRobin.add(ctx.getLocalAddress("KsbAgentSender4"));
roundRobin.add(ctx.getLocalAddress("KsbAgentSender5"));
roundRobin.add(ctx.getLocalAddress("KsbAgentSender15"));
roundRobin.add(ctx.getLocalAddress("KsbAgentSender16"));

// Iheart
roundRobin.add(ctx.getLocalAddress("IheartLowSender04")); 
roundRobin.add(ctx.getLocalAddress("IheartLowSender05")); 
roundRobin.add(ctx.getLocalAddress("IheartLowSender06")); 
roundRobin.add(ctx.getLocalAddress("IheartMMSSender3")); 
roundRobin.add(ctx.getLocalAddress("IheartMMSSender4")); 
roundRobin.add(ctx.getLocalAddress("IheartSPSenderD")); 
roundRobin.add(ctx.getLocalAddress("IheartSPSenderE")); 
roundRobin.add(ctx.getLocalAddress("IheartSPSenderF")); 
roundRobin.add(ctx.getLocalAddress("IheartSender4")); 
roundRobin.add(ctx.getLocalAddress("IheartSender5")); 
roundRobin.add(ctx.getLocalAddress("IheartSender6"));

// NanoIT
roundRobin.add(ctx.getLocalAddress("NanoItNGSender4")); 
roundRobin.add(ctx.getLocalAddress("NanoItNGSender5")); 
roundRobin.add(ctx.getLocalAddress("NanoItNGSender6")); 

// SKT Direct
roundRobin.add(ctx.getLocalAddress("MMSSKTSender16")); 
roundRobin.add(ctx.getLocalAddress("MMSSKTSender17")); 
roundRobin.add(ctx.getLocalAddress("MMSSKTSender18")); 
roundRobin.add(ctx.getLocalAddress("MMSSKTSender19")); 
roundRobin.add(ctx.getLocalAddress("MMSSKTSender21")); 
roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC1")); 
roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC2")); 
roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC3")); 
roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC4")); 
roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC5")); 
roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC6")); 

// KTF Direct
roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));

// LGT Direct
roundRobin.add(ctx.getLocalAddress("MMSLGTSender11"));
roundRobin.add(ctx.getLocalAddress("MMSLGTSender12"));
*/

function main() {
  if (module == "MMSReceiver") {
    if (reservedId != null && reservedId != "" && groupCode == "B000654") {
      log.warn("set group code to reservedId: " + reservedId);
      m.set(ShortMessage.GROUP_CODE, reservedId);
    }
    if (status == ShortMessageStatus.OK) {
      var roundRobin = new RoundRobinTransmissionCommand();
      roundRobin.add(ctx.getLocalAddress("SpamPersonFilter"));
      roundRobin.add(ctx.getLocalAddress("SpamPersonFilter2"));
      roundRobin.add(ctx.getLocalAddress("SpamPersonFilter3"));
      roundRobin.add(ctx.getLocalAddress("SpamPersonFilter4"));
      roundRobin.execute(ctx);
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

      //Send to SKT
      if (provider.equals(MMSConstants.PROVIDER_SKT)) {
        //2016.03.22 Start of Sender Test Code
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
            roundRobin.add(ctx.getLocalAddress("LghvSender1"));
            roundRobin.add(ctx.getLocalAddress("LghvSender2"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "SMTTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "UMCTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("UnionmcSender5"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender6"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender7"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender8"));
            roundRobin.execute(ctx);	
          } else if (serviceCode == "KSYTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("KsbAgentSender4"));
            roundRobin.add(ctx.getLocalAddress("KsbAgentSender5"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "NANTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("NanoItNGSender4"));
            roundRobin.add(ctx.getLocalAddress("NanoItNGSender5"));
            roundRobin.add(ctx.getLocalAddress("NanoItNGSender6"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "IHTTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartSender4"));
            roundRobin.add(ctx.getLocalAddress("IheartSender5"));
            roundRobin.add(ctx.getLocalAddress("IheartSender6"));
            roundRobin.execute(ctx);  
          } else {
            ctx.transmit(address.toModuleAddress("MMSSKTSender16"));
          }
          // Special Callback
        } else if (checkSpecialCallback(groupCode, callback) == 1) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender16"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender17"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender18"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender19"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender21"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender16"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender17"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender18"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender19"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender21"));
            roundRobin.execute(ctx);
          }
          // SKT Direct
        } else if (
          groupCode == "B001805" ||
          groupCode == "B001849" ||
          groupCode == "B001680" ||
          groupCode == "B001666" ||
          groupCode == "B000516" ||
          groupCode == "B001916" ||
          groupCode == "B001824" ||
          groupCode == "B001893"
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender16"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender17"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender18"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender19"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender21"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC1"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC2"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC3"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC4"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC5"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSenderC6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender16"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender17"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender18"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender19"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender21"));
            roundRobin.execute(ctx);
          }
          // UnionMC
        } else if (groupCode == "B001817" || groupCode == "B001802") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("UnionmcSender5"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender6"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender7"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender8"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          }
          // Hanjin
        } else if (
          groupCode == "B000854" ||
          groupCode == "B001555" ||
          groupCode == "B000715" ||
          groupCode == "B001403" ||
          groupCode == "B000669" ||
          groupCode == "B001785" ||
          groupCode == "B001872" ||
          groupCode == "B001496" ||
          groupCode == "B000617"
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          }
          // Iheart
        } else if (groupCode == "B000745" || 
           groupCode == "B001897" && reservedId.match(/^B002132/)) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartSender4"));
            roundRobin.add(ctx.getLocalAddress("IheartSender5"));
            roundRobin.add(ctx.getLocalAddress("IheartSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartMMSSender4"));
            roundRobin.execute(ctx);
          }
          // SMTMT
        } else if (groupCode == "B001329") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          }
          // Default
        } else {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender16"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender17"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender18"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender19"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender21"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender16"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender17"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender18"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender19"));
            roundRobin.add(ctx.getLocalAddress("MMSSKTSender21"));
            roundRobin.execute(ctx);
          }
        }
        //Send to KTF
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
            roundRobin.add(ctx.getLocalAddress("LghvSender1"));
            roundRobin.add(ctx.getLocalAddress("LghvSender2"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "SMTTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "UMCTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("UnionmcSender5"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender6"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender7"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender8"));
            roundRobin.execute(ctx);	
          } else if (serviceCode == "KSYTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("KsbAgentSender4"));
            roundRobin.add(ctx.getLocalAddress("KsbAgentSender5"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "NANTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("NanoItNGSender4"));
            roundRobin.add(ctx.getLocalAddress("NanoItNGSender5"));
            roundRobin.add(ctx.getLocalAddress("NanoItNGSender6"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "IHTTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartSender4"));
            roundRobin.add(ctx.getLocalAddress("IheartSender5"));
            roundRobin.add(ctx.getLocalAddress("IheartSender6"));
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
          // KTF Direct
        } else if (
          groupCode == "B001805" ||
          groupCode == "B001849" ||
          groupCode == "B001680" ||
          groupCode == "B001666" ||
          groupCode == "B000516" ||
          groupCode == "B001916" ||
          groupCode == "B001824" ||
          groupCode == "B001893"
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
          // UnionMC
        } else if (groupCode == "B001817" || groupCode == "B001802") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("UnionmcSender5"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender6"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender7"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender8"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          }
          // Hanjin
        } else if (
          groupCode == "B000854" ||
          groupCode == "B001555" ||
          groupCode == "B000715" ||
          groupCode == "B001403" ||
          groupCode == "B000669" ||
          groupCode == "B001785" ||
          groupCode == "B001872" ||
          groupCode == "B001496" ||
          groupCode == "B000617"
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          }
          // Iheart
        } else if (groupCode == "B000745" ||
          groupCode == "B001897" && reservedId.match(/^B002132/)) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartSender4"));
            roundRobin.add(ctx.getLocalAddress("IheartSender5"));
            roundRobin.add(ctx.getLocalAddress("IheartSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartMMSSender4"));
            roundRobin.execute(ctx);
          }
          // SMTMT
        } else if (groupCode == "B001329") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
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
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
            roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
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
            roundRobin.add(ctx.getLocalAddress("LghvSender1"));
            roundRobin.add(ctx.getLocalAddress("LghvSender2"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "SMTTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "UMCTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("UnionmcSender5"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender6"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender7"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender8"));
            roundRobin.execute(ctx);	
          } else if (serviceCode == "KSYTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("KsbAgentSender4"));
            roundRobin.add(ctx.getLocalAddress("KsbAgentSender5"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "NANTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("NanoItNGSender4"));
            roundRobin.add(ctx.getLocalAddress("NanoItNGSender5"));
            roundRobin.add(ctx.getLocalAddress("NanoItNGSender6"));
            roundRobin.execute(ctx);
          } else if (serviceCode == "IHTTE") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartSender4"));
            roundRobin.add(ctx.getLocalAddress("IheartSender5"));
            roundRobin.add(ctx.getLocalAddress("IheartSender6"));
            roundRobin.execute(ctx);    
          } else {
            ctx.transmit(address.toModuleAddress("LgAgentSender"));
          }
          // Special Callback
        } else if (checkSpecialCallback(groupCode, callback) == 1) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
            roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
            roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
            roundRobin.execute(ctx);
          }
          // Lg Agent
        } else if (
          groupCode == "B001824" ||
          groupCode == "B001849" ||
          groupCode == "B001680" ||
          groupCode == "B001666" ||
          groupCode == "B000516" ||
          groupCode == "B001916" ||
          groupCode == "B001805"
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
            roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
            roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          }
          // UnionMC
        } else if (groupCode == "B001817" || groupCode == "B001802") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("UnionmcSender5"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender6"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender7"));
            roundRobin.add(ctx.getLocalAddress("UnionmcSender8"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          }
          // Hanjin
        } else if (
          groupCode == "B000854" ||
          groupCode == "B001555" ||
          groupCode == "B000715" ||
          groupCode == "B001403" ||
          groupCode == "B000669" ||
          groupCode == "B001785" ||
          groupCode == "B001872" ||
          groupCode == "B001496" ||
          groupCode == "B000617"
        ) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("HistSender1"));
            roundRobin.add(ctx.getLocalAddress("HistSender2"));
            roundRobin.add(ctx.getLocalAddress("HistSender3"));
            roundRobin.add(ctx.getLocalAddress("HistSender4"));
            roundRobin.add(ctx.getLocalAddress("HistSender5"));
            roundRobin.add(ctx.getLocalAddress("HistSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          }
          // Iheart
        } else if (groupCode == "B001893" || 
                   groupCode == "B000745" ||
                   groupCode == "B001897" && reservedId.match(/^B002132/)) {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartSender4"));
            roundRobin.add(ctx.getLocalAddress("IheartSender5"));
            roundRobin.add(ctx.getLocalAddress("IheartSender6"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartMMSSender4"));
            roundRobin.execute(ctx);
          }
          // SMTMT
        } else if (groupCode == "B001329") {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("SmtntSender1"));
            roundRobin.add(ctx.getLocalAddress("SmtntSender2"));
            roundRobin.execute(ctx);
          }
          // Default
        } else {
          if (mmsConType == "100000") {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
            roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
            roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
            roundRobin.execute(ctx);
          } else {
            var roundRobin = new RoundRobinTransmissionCommand();
            roundRobin.add(ctx.getLocalAddress("IheartSender4"));
            roundRobin.add(ctx.getLocalAddress("IheartSender5"));
            roundRobin.add(ctx.getLocalAddress("IheartSender6"));
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
          roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
          roundRobin.execute(ctx);
        } else {
          var roundRobin = new RoundRobinTransmissionCommand();
          roundRobin.add(ctx.getLocalAddress("IheartSender4"));
          roundRobin.add(ctx.getLocalAddress("IheartSender5"));
          roundRobin.add(ctx.getLocalAddress("IheartSender6"));
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

  //������ ������	TEXT + JPG Image �̰�, ASSIGN_CD ��	0 �� ���?	������ ó����, �̿ܿ���	���������� ����
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
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender16"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender17"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender18"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender19"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender21"));
      //roundRobin.add(ctx.getLocalAddress("MMSSKTSender23"));
      //roundRobin.add(ctx.getLocalAddress("MMSSKTSender24"));
      //roundRobin.add(ctx.getLocalAddress("MMSSKTSender25"));
      //roundRobin.add(ctx.getLocalAddress("MMSSKTSender26"));
      //roundRobin.add(ctx.getLocalAddress("MMSSKTSender27"));
      roundRobin.execute(ctx);
    } else if (!trace.containsWildcards("*/MMSKTFSender*")) {
      log.info("resend to KTF...");
      serviceProvider = MMSConstants.PROVIDER_KTF;
      m.remove(ShortMessage.SENDING_FLAG);

      var roundRobin = new RoundRobinTransmissionCommand();
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.execute(ctx);
    } else if (!trace.containsWildcards("*/LgAgentSender*")) {
      log.info("resend to LGT...");
      serviceProvider = MMSConstants.PROVIDER_LGT;
      m.remove(ShortMessage.SENDING_FLAG);

      if (groupCode == "B001805") {
        var roundRobin = new RoundRobinTransmissionCommand();
        roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
        roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
        roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
        roundRobin.execute(ctx);
      } else {
        if (mmsConType == "100000") {
          var roundRobin = new RoundRobinTransmissionCommand();
          //roundRobin.add(ctx.getLocalAddress("IheartSender4"));
          //roundRobin.add(ctx.getLocalAddress("IheartSender5"));
          //roundRobin.add(ctx.getLocalAddress("IheartSender6"));
          //roundRobin.add(ctx.getLocalAddress("IheartSender4"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
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
      //�� ���� ���� ����	= ó�� ��
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

// ���� ����¿�? ��ȣ�̵�/�̰����� ������ ó��
function duzonPostProcess() {
  var done = false;
  var lastModuleName = m.getTrace().getLatest().getAddress().getModuleName();

  //������ ������ TEXT + JPG Image �̰�, ASSIGN_CD �� 0 �� ���? ������ ó����, �̿ܿ��� ���������� ����

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
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender16"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender17"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender18"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender19"));
      roundRobin.add(ctx.getLocalAddress("MMSSKTSender21"));
      //roundRobin.add(ctx.getLocalAddress("MMSSKTSender23"));
      //roundRobin.add(ctx.getLocalAddress("MMSSKTSender24"));
      //roundRobin.add(ctx.getLocalAddress("MMSSKTSender25"));
      //roundRobin.add(ctx.getLocalAddress("MMSSKTSender26"));
      //roundRobin.add(ctx.getLocalAddress("MMSSKTSender27"));
      roundRobin.execute(ctx);
    } else if (!trace.containsWildcards("*/MMSKTFSender*")) {
      log.info("duzon resend to KTF...");
      serviceProvider = MMSConstants.PROVIDER_KTF;
      m.remove(ShortMessage.SENDING_FLAG);

      var roundRobin = new RoundRobinTransmissionCommand();
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender1"));
      roundRobin.add(ctx.getLocalAddress("MMSKTFSender2"));
      roundRobin.execute(ctx);
    } else if (!trace.containsWildcards("*/LgAgentSender*")) {
      log.info("duzon resend to LGT...");
      serviceProvider = MMSConstants.PROVIDER_LGT;
      m.remove(ShortMessage.SENDING_FLAG);

      if (groupCode == "B001805") {
        var roundRobin = new RoundRobinTransmissionCommand();
        roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
        roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
        roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
        roundRobin.execute(ctx);
      } else {
        if (mmsConType == "100000") {
          var roundRobin = new RoundRobinTransmissionCommand();
          //roundRobin.add(ctx.getLocalAddress("IheartSender4"));
          //roundRobin.add(ctx.getLocalAddress("IheartSender5"));
          //roundRobin.add(ctx.getLocalAddress("IheartSender6"));
          //roundRobin.add(ctx.getLocalAddress("IheartSender5"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender2"));
          roundRobin.add(ctx.getLocalAddress("LgAgentSender3"));
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
      //�� ���� ���� ���� = ó�� ��
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
  } else if (grpcd == "B001555") {
    if (callback == "01585118888" || callback == "01585119999") {
      checkYN = 1;
    }
  }

  return checkYN;
}

/**
 * Database�� ���? �ϱ�	���� ����
 */
function logging() {
  ctx.transmit(address.toModuleAddress("MMSDatabaseLogger1"));
}

main();
