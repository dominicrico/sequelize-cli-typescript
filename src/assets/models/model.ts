import { Sequelize, DataTypes, Model } from 'sequelize'
import sequelize from '@bunch/lib/db'

<%
  function getType(dataType) {
    dataType = dataType.toLowerCase();

    if ( ['tinyint', 'smallint', 'mediumint', 'integer', 'bigint', 'float', 'double', 'decimal', 'real'].indexOf(dataType) !== -1 ) {
      return 'number;';
    }

    if ( ['char', 'string', 'text', 'blob'].indexOf(dataType) !== -1 ) {
      return 'string;';
    }

    if ( ['date'].indexOf(dataType) !== -1 ) {
      return 'Date;';
    }

    if ( ['dateonly', 'time', 'now', 'json', 'jsonb'].indexOf(dataType) !== -1 ) {
      return 'string;  // actually a ' + dataType + ' column';
    }

    if ( ['enum'].indexOf(dataType) !== -1 ) {
      return "string;  // replace with 'validValue1' | 'validValue2', ...";
    }

    if ( ['boolean'].indexOf(dataType) !== -1 ) {
      return 'boolean;';
    }

    if ( ['uuid', 'uuidv1', 'uuidv4'].indexOf(dataType) !== -1 ) {
      return 'string;';
    }

    return dataType;
  }
%>

export interface <%= name[0].toUpperCase() + name.substr(1) %>Attributes {
  id: number
  <% attributes.forEach(function(attribute) {
  %><%= attribute.fieldName %>?: <%= getType(attribute.dataType) %>
  <%
  }) %>

  createdAt?: Date
  updatedAt?: Date
}

class <%= name[0].toUpperCase() + name.substr(1) %> extends Model {
  public id!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  <% attributes.forEach(function(attribute) {
  %>public <%= attribute.fieldName %>: <%= getType(attribute.dataType) %>
  <%
  }) %>
}

<%= name[0].toUpperCase() + name.substr(1) %>.init(
  {
    <% attributes.forEach(function(attribute, index) { %><%= attribute.fieldName %>: DataTypes.<%= attribute.dataFunction ? `${attribute.dataFunction.toUpperCase()}(DataTypes.${attribute.dataType.toUpperCase()})` : attribute.dataType.toUpperCase() %><%= (Object.keys(attributes).length - 1) > index ? ',' : '' %><% }) %>
  },
  {
    paranoid: true,
    timestamps: true,
    sequelize,
    modelName: '<%= name[0].toUpperCase() + name.substr(1) %>'
  }
)

export default <%= name[0].toUpperCase() + name.substr(1) %>
